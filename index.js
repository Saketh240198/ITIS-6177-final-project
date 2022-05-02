const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios").default;
const PORT = process.env.PORT || 3000;
const app = express();

require("dotenv").config();

/* swagger Info */
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    info: {
      title: "ITIS-6177-Final-Project",
      version: "1.0.0",
      description: "Final Project implementing Face API from Microsoft Azure",
      contact: {
        name: "Venkata Saketh Vellanki",
        url: "https://github.com/Saketh240198",
        email: "saketh.vellanki@gmail.com",
      },
    },
    host: "localhost:3000",
    basePath: "/",
  },
  apis: ["./index.js"],
};

const specs = swaggerJsDoc(options);

const detection_endpoint =
  "https://vsv-faceres.cognitiveservices.azure.com/face/v1.0/detect";
const verification_endpoint =
  "https://vsv-faceres.cognitiveservices.azure.com/face/v1.0/verify";
const api_key = process.env.api_key;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /detect:
 *   post:
 *     tags:
 *       - Face Detection
 *     description: Calls the Face Detection endpoint from Microsoft Azure
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: detectionModel
 *         description: Specifying a Face Detection Model Version
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           example: detection_01
 *       - name: returnFaceId
 *         description: Returns faceIds of the detected faces
 *         in: query
 *         required: true
 *         schema:
 *           type: boolean
 *           example: true
 *       - name: returnFaceLandmarks
 *         description: Returns face landmarks of the detected faces
 *         in: query
 *         required: true
 *         schema:
 *           type: boolean
 *           example: true
 *       - name: returnFaceAttributes
 *         description: Returns the face attributes of the detected faces
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           example: age,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise
 *       - name: body
 *         description: Image URL to detect the faces present in the image
 *         in: body
 *         required: true
 *         schema:
 *           type: string
 *           items:
 *              type: string
 *           example: {"url":"https://s01.sgp1.cdn.digitaloceanspaces.com/article/141241-vgvamzieyj-1589291225.jpg"}
 *     responses:
 *       200:
 *         description: Successfully performed Face Detection
 *       400:
 *         description: Request body is invalid
 *       401:
 *         description: Access denied due to invalid subscription key
 *       408:
 *         description: Request Timeout
 */
app.post("/detect", (req, res) => {
  let detectionModel = req.query.detectionModel;
  let returnFaceId = req.query.returnFaceId;
  let returnFaceAttributes = req.query.returnFaceAttributes;
  let returnFaceLandmarks = req.query.returnFaceLandmarks;

  let inpParams = {};
  if (detectionModel) {
    inpParams["detectionModel"] = detectionModel;
  }
  if (returnFaceId) {
    inpParams["returnFaceId"] = returnFaceId;
  }
  if (returnFaceAttributes) {
    inpParams["returnFaceAttributes"] = returnFaceAttributes;
  }
  if (returnFaceLandmarks) {
    inpParams["returnFaceLandmarks"] = returnFaceLandmarks;
  }
  let image = req.body;
  axios
    .post(detection_endpoint, image, {
      headers: {
        "Ocp-Apim-Subscription-Key": api_key,
        "Content-Type": "application/json",
      },
      params: inpParams,
    })
    .then((resp) => {
      res.json(resp.data);
    })
    .catch((e) => {
      console.log(e);
    });
});

/**
 * @swagger
 * /verify:
 *   post:
 *     tags:
 *       - Face Verification
 *     description: Calls the Face Verification endpoint from Microsoft Azure
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Face ID's of the detected faces obtained from calling the Face Detection endpoint
 *         in: body
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *              type: string
 *           example: {"faceId1": "71546360-6d7d-420b-a350-f1ade5a2bf36","faceId2": "cbe58d98-3838-4c6b-828e-de74a7af805e"}
 *     responses:
 *       200:
 *         description: Successfully performed Face Verification
 *       400:
 *         description: Request body is invalid
 *       401:
 *         description: Access denied due to invalid subscription key
 */
app.post("/verify", (req, res) => {
  let data = {
    faceId1: req.body.faceId1,
    faceId2: req.body.faceId2,
  };
  axios
    .post(verification_endpoint, data, {
      headers: {
        "Ocp-Apim-Subscription-Key": api_key,
        "Content-Type": "application/json",
      },
    })
    .then((resp) => {
      res.json(resp.data);
    })
    .catch((e) => {
      console.log(e);
    });
});
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
