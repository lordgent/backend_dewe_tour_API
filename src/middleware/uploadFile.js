const multer = require("multer");

exports.uploadFile = (imageTrip, imageProfile, imagePayment) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      switch (file.fieldname) {
        case "imageTrip":
          cb(null, "uploads/images");
          break;
        case "imageProfile":
          cb(null, "uploads/profile");
          break;
        case "imagePayment":
          cb(null, "uploads/payment");
          break;
      }
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname.replace(/\s/g, ""));
    },
  });

  const fileFilter = (req, file, cb) => {
    if (
      file.fieldname === imageTrip &&
      file.fieldname === imageProfile &&
      file.fieldname === imagePayment
    ) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        req.fileValidationError = "only file images..";
        return cb(new Error("Only image files are allowed!"), false);
      }
    }
    cb(null, true);
  };

  const sizeInMB = 20;
  const maxSize = sizeInMB * 1000 * 1000;

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).fields([
    {
      name: imageTrip,
      maxCount: 6,
    },
    {
      name: imageProfile,
      maxCount: 1,
    },
    {
      name: imagePayment,
      maxCount: 1,
    },
  ]);

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (req.fileValidationError) {
        return res.status(400).send({
          status: "Upload Failed!",
          message: req.fileValidationError,
        });
      }

      if (!req.files && !err) {
        return res.status(400).send({
          status: "Upload Failed!",
          message: "Please upload file!",
        });
      }

      if (err) {
        console.log(err);
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            status: "Upload Failed!",
            message: "Max file sized 10mb",
          });
        }
        return res.status(400).send(err);
      }

      return next();
    });
  };
};
