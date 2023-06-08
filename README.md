# Lab 17

## Project: AWS - S3 and Lambda

### Authors: Ike Steoger

### Problem Domain

Create an S3 Bucket with “open” read permissions, so that anyone can see the images/files in their browser. A user should be able to upload an image at any size, and update a dictionary of all images that have been uploaded so far.

### Links and Resources

- [GitHub Actions ci/cd](https://github.com/IkeSteoger/image-lambda/actions)
<!-- - [GUI Deploy url]()
- [CLI Deploy url]() -->
[Amazon AWS: Images.json](https://ikesteoger-images.s3.us-west-2.amazonaws.com/images.json)

### Collaborators

- Reece Renninger
- Kaeden O'Maera
- Ryan Gallaway
- Ryan Eastman
- Ethan Storm

### How To Use Lambda

When you upload an image with a `.jpg` extension, it will trigger the lambda.

### Issues Encountered

I found out I built my `images.json` without using an `[]` on the outside, causing issues with my `.push`. Fixing that was key!

<!-- ### Setup

#### Processes

#### Tests

To run tests, after running `npm i`, run the command `npm test` -->

<!-- #### UML

![UML](./assets/uml.png) -->
