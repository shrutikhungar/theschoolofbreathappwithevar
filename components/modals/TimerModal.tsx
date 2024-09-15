import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import CircularTimer from '../timer/CircularTimer';
import { modalStyles } from '../../styles/modal.styles';
import { DARK_COLOR } from '../../styles/playerScreen.styles';


interface TimerModalProps {
  visible: boolean;
  onClose: () => void;
  endTimer: () => void;
}

const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 3;
const ITEM_OFFSET = Math.floor(VISIBLE_ITEMS / 2);

const TimerModal: React.FC<TimerModalProps> = ({ visible, onClose, endTimer }) => {
  const [selectedHour, setSelectedHour] = useState<number>(0);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const [selectedSecond, setSelectedSecond] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  const hourRef = useRef<FlatList>(null);
  const minuteRef = useRef<FlatList>(null);
  const secondRef = useRef<FlatList>(null);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  const generateNumbers = (count: number) => {
    const numbers = Array.from({ length: count }, (_, i) => i);
    return [...numbers, ...numbers, ...numbers];
  };

  const hours = generateNumbers(24);
  const minutes = generateNumbers(60);
  const seconds = generateNumbers(60);

  useEffect(() => {
    if (running && timeRemaining !== null) {
      timerInterval.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev && prev > 0) {
            return prev - 1;
          } else {
            if (timerInterval.current) clearInterval(timerInterval.current);
            setRunning(false);
            endTimer();
            return 0;
          }
        });
      }, 1000);
    }

    return () => {
      if (timerInterval.current) clearInterval(timerInterval.current);
    };
  }, [running, timeRemaining, endTimer]);

  const resetPicker = () => {
    setSelectedHour(0);
    setSelectedMinute(0);
    setSelectedSecond(0);
    hourRef.current?.scrollToOffset({ offset: ITEM_HEIGHT * ITEM_OFFSET, animated: false });
    minuteRef.current?.scrollToOffset({ offset: ITEM_HEIGHT * ITEM_OFFSET, animated: false });
    secondRef.current?.scrollToOffset({ offset: ITEM_HEIGHT * ITEM_OFFSET, animated: false });
  };

  useEffect(() => {
    if (!visible) {
      resetPicker();
    }
  }, [visible]);

  const startTimer = () => {
    const totalTimeInSeconds = selectedHour * 3600 + selectedMinute * 60 + selectedSecond;
    setTimeRemaining(totalTimeInSeconds);
    setRunning(true);
  };

  const cancelTimer = () => {
    if (timerInterval.current) clearInterval(timerInterval.current);
    setRunning(false);
    setTimeRemaining(null);
    resetPicker();
  };

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
  };

  const handleScrollEnd = useCallback((type: 'hour' | 'minute' | 'second') => 
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      const index = Math.round(offsetY / ITEM_HEIGHT);
      const actualIndex = index % (type === 'hour' ? 24 : 60);
      
      if (type === 'hour') {
        setSelectedHour(actualIndex);
        if (index < 24 || index >= 48) {
          hourRef.current?.scrollToOffset({ offset: (actualIndex + 24) * ITEM_HEIGHT, animated: false });
        }
      } else if (type === 'minute') {
        setSelectedMinute(actualIndex);
        if (index < 60 || index >= 120) {
          minuteRef.current?.scrollToOffset({ offset: (actualIndex + 60) * ITEM_HEIGHT, animated: false });
        }
      } else if (type === 'second') {
        setSelectedSecond(actualIndex);
        if (index < 60 || index >= 120) {
          secondRef.current?.scrollToOffset({ offset: (actualIndex + 60) * ITEM_HEIGHT, animated: false });
        }
      }
    }, []);

  const renderItem = useCallback((type: 'hour' | 'minute' | 'second') => 
    ({ item, index }: { item: number; index: number }) => {
      const isSelected = index % (type === 'hour' ? 24 : 60) === (
        type === 'hour' ? selectedHour : 
        type === 'minute' ? selectedMinute : selectedSecond
      );
      return (
        <View style={styles.itemContainer}>
          <Text style={[styles.itemText, isSelected && styles.selectedItemText]}>
            {String(item).padStart(2, '0')}
          </Text>
        </View>
      );
    }, [selectedHour, selectedMinute, selectedSecond]);

  const totalTime = selectedHour * 3600 + selectedMinute * 60 + selectedSecond;
  const progress = totalTime && timeRemaining !== null ? (totalTime - timeRemaining) / totalTime : 0;

  return (
    <Modal visible={visible} transparent  animationType="slide">
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.modalContainer}>
          <Text style={modalStyles.modalTitle}>TIMER</Text>

          {running ? (
            <CircularTimer
              radius={100}
              strokeWidth={10}
              strokeColor="#1ABDA0"
              bgColor={DARK_COLOR}
              progress={progress}
              timeText={formatTime(timeRemaining ?? 0)}
            />
          ) : (
            <View style={styles.pickerContainer}>
              <FlatList
                ref={hourRef}
                data={hours}
                renderItem={renderItem('hour')}
                keyExtractor={(item, index) => `hour-${index}`}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                onMomentumScrollEnd={handleScrollEnd('hour')}
                getItemLayout={(_, index) => ({
                  length: ITEM_HEIGHT,
                  offset: ITEM_HEIGHT * index,
                  index,
                })}
                style={styles.picker}
                initialScrollIndex={24 + ITEM_OFFSET}
                contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * ITEM_OFFSET }}
              />
              <Text style={styles.separator}>:</Text>
              <FlatList
                ref={minuteRef}
                data={minutes}
                renderItem={renderItem('minute')}
                keyExtractor={(item, index) => `minute-${index}`}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                onMomentumScrollEnd={handleScrollEnd('minute')}
                getItemLayout={(_, index) => ({
                  length: ITEM_HEIGHT,
                  offset: ITEM_HEIGHT * index,
                  index,
                })}
                style={styles.picker}
                initialScrollIndex={60 + ITEM_OFFSET}
                contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * ITEM_OFFSET }}
              />
              <Text style={styles.separator}>:</Text>
              <FlatList
                ref={secondRef}
                data={seconds}
                renderItem={renderItem('second')}
                keyExtractor={(item, index) => `second-${index}`}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                onMomentumScrollEnd={handleScrollEnd('second')}
                getItemLayout={(_, index) => ({
                  length: ITEM_HEIGHT,
                  offset: ITEM_HEIGHT * index,
                  index,
                })}
                style={styles.picker}
                initialScrollIndex={60 + ITEM_OFFSET}
                contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * ITEM_OFFSET }}
              />
            </View>
          )}
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={{...styles.startButton,backgroundColor:!running ? '#352c44' : '#352c44'}} 
              onPress={running ? cancelTimer : startTimer}
            >
              <Text style={styles.startButtonText}>{running ? 'CANCEL' : 'START'}</Text>
            </TouchableOpacity>
            {!running && (
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>CLOSE</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
 
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius:20,
    padding:15
  },
  picker: {
    width: 60,
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
  
    
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    
    
  },
  itemText: {
    fontSize: 20,
  },
  selectedItemText: {
    color: '#352c44',
    fontSize: 22,
    fontWeight: 'bold',
    
  },
  separator: {
    fontSize: 24,
    marginHorizontal: 10,
  },
  timerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#352c44',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 10,
    borderColor:'#352c44',
    borderWidth:2,
    color:'#352c44',
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButtonText: {
    color: '#352c44',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default TimerModal;