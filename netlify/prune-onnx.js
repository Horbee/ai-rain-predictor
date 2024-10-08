const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");

const onnxPath = path.join(__dirname, "./node_modules/onnxruntime-node");
const napiPath = path.join(onnxPath, "bin", "napi-v3");

const foldersToDelete = ["darwin", "win32"];

foldersToDelete.forEach((folder) => {
  const folderPath = path.join(napiPath, folder);
  rimraf.sync(folderPath);
  console.log(`Deleted (if existed): ${folderPath}`);
});

// Remove unnecessary files from the root of onnxruntime-node
fs.readdirSync(onnxPath).forEach((file) => {
  if (
    file.startsWith("onnxruntime_binding") &&
    (file.includes("darwin") || file.includes("win32"))
  ) {
    const filePath = path.join(onnxPath, file);
    fs.unlinkSync(filePath);
    console.log(`Deleted: ${filePath}`);
  }
});

console.log("ONNX Runtime pruning completed.");
