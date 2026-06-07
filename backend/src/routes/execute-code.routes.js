import express from "express";
import { runCode } from "../controllers/execute-code.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, runCode
);

export default router;

/*
Vijay@fedora:~$ curl -X POST "http://192.168.1.2:2358/submissions?base64_encoded=false&wait=true" -H "Content-Type: application/json" -d '{
  "source_code":"#include <stdio.h>\nint main(){printf(\"Hello World\");}",
  "language_id":50
}'
{"stdout":"Hello World","time":"0.005","memory":26128,"stderr":null,"token":"fc433bb8-cda7-4b48-a27b-274157cae7dd","compile_output":null,"message":null,"status":{"id":3,"description":"Accepted"}}
*/
