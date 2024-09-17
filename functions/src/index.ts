import * as functions from "firebase-functions";
import {SecretManagerServiceClient} from "@google-cloud/secret-manager";

const client = new SecretManagerServiceClient();

export const getSecretValue = functions.https.onRequest(async (req, res) => {
  const secretName = req.query.name as string;

  try {
    const [version] = await client.accessSecretVersion({
      name: `projects/sleepmusicapp-413415/secrets/${secretName}/versions/` +
            "latest",
    });

    const payload = version.payload?.data ?
      Buffer.from(version.payload.data).toString("utf8") :
      null;

    res.status(200).send({secret: payload});
  } catch (error) {
    console.error("Error fetching secret:", error);
    res.status(500).send("Error fetching secret");
  }
});
