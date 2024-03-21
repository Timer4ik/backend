const uuid = require("uuid")
const path = require("path")

module.exports = function (req, config = { multiple: false }) {
   let file = req?.files?.file
   if (file) {
      if (!config.multiple) {
         let fileName
         if (file) {
            file = Array.isArray(file) ? file[file.length - 1] : file
            fileName = uuid.v4() + "." + file.name.split(".")[1]
            req.body.file = fileName
         }
         return {
            size:file.size,
            load:() => file.mv(path.resolve(__dirname, "../static", fileName)),
         }
      }
      else {
         let files = Array.isArray(file) ? file : [file]
         req.body.files = []

         let fileLoaders = files.map((file) => {
            let fileName = uuid.v4() + "." + file.name.split(".")[1]
            req.body.files.push(fileName)
            return () => file.mv(path.resolve(__dirname, "../static", fileName))
         })

         return {
            load:() => fileLoaders.forEach(mv => mv())
         }
      
      }

   }
}