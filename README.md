# System Integration Final Project using Microsoft Azure Face API

### Topic – Microsoft Azure Face API 
The Azure Face service provides AI algorithms that detect, recognize, and analyze human faces in images. Facial recognition software is important in many different scenarios, such as identity verification, touchless access control, and face blurring for privacy.
### Implementing Two Endpoints: 

**1) Face Detection (/ detect)** 

 - Face detection is used to successfully detect the faces of the persons in an image.  
 - The Detect API detects human faces in an image and returns the rectangle  coordinates of their locations.  
 - It returns a unique face ID that represents the stored face data.  
 - It also displays the face landmarks and face attributes.

**Input**: Give the URL of the image consisting of any human faces 

**Output**: It returns the rectangular coordinates of the detected faces, a unique face ID, face landmarks and also the face attributes.

**2) Face Verification (/verify)** 

 - Verification is also a "one-to-one" matching of a face in an image to a single face from a secure repository or photo to verify that they're the same individual. Face Verification is used to verify the identity of the individuals.   
 - It takes as input the Face ID’s of the
   detected faces and returns a boolean value “isIdentical” which will be True if the two faces are identical and False if the two faces are not identical.
   
 - It also gives a “confidence” value which will range from 0 to 1. A
   Higher confidence value indicates that both the faces are more
   identical and the boolean value “isIdentical” will be returned as
   True. By default, “isIdentical” is set to True if the confidence
   value is greater than or equal to 0.5.

**Input**: Give the Face ID’s of the detected faces obtained from calling the face detection endpoint.

**Output**: It returns a boolean value “isIdentical” which can be True or False and also a “confidence” value which would range from 0 to 1.

**References**: 
Microsoft Azure Documentation - https://docs.microsoft.com/en-us/azure/cognitive-services/face/overview 

URL to Live API - http://159.203.185.164:3000/api-docs
