const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 5001;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

mongoose.connect(
  "mongodb+srv://afif:admin@cluster0.vsylghq.mongodb.net?retryWrites=true&w=majority"
);

const token = {
  token : Number
}

const faceMaster = {
  label: String,
  descriptors: Array,
};

const regInfo = {
  Uid: String,
  First_name: String,
  Dob: Date,
  Gender: String,
  Address: String,
  Phone: String,
  Email: String,
  Blood_group: String,
  Chronic_Medical_Conditions: Array,
  Long_term_ongoing_Medication: Array,
};

const appointment = {
  Date: Date,
  Time: String,
  Doctor: String,
  Uid: String,
};

// schema land ends

const RegInfo = mongoose.model("RegInfo", regInfo);
const Appointment = mongoose.model("Appointment", appointment);
const FaceMaster = mongoose.model("FaceMaster", faceMaster);
const TokenRegister = mongoose.model("TokenRegister",token);

console.log(PORT);

// {"_id":{"$oid":"64151c9958c965dcc0ea4c07"},"token":{"$numberLong":"0"}}

app.get("/getToken", async function (req, res) {
  try {
    const foundToken = await TokenRegister.findOne({ _id: "64151c9958c965dcc0ea4c07" });
    if (!foundToken) {
      return res.status(404).send({ message: "Token not found" });
    }
    console.log(foundToken.token);
    let updatedItem;
    if (foundToken.token > 1000) {
      console.log("high");
      updatedItem = { token: 0 };
    } else {
      console.log("low");
      updatedItem = { token: foundToken.token + 1 };
    }
    await TokenRegister.updateOne({ _id: "64151c9958c965dcc0ea4c07" }, updatedItem);
    res.send({ token: updatedItem.token });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
});


app.route("/createFace").post(function (req, res) {
  const newItem = new FaceMaster({
    label: req.body.label,
    descriptors: req.body.descriptors,
  });

  newItem.save()
    .then(() => {
      res.send("SUCCESS");
    })
    .catch((err) => {
      console.log("FAIL", err);
      res.send("FAIL");
    });
});


app.route("/getFaceMaster").get(function (req, res) {
  FaceMaster.find({})
    .then((foundPatient) => {
      if (foundPatient) {
        //console.log(Object.values(foundPatient[0].descriptors[0]))
        res.send(
          foundPatient.map((ele) => {
            return { label: ele.label, descriptors: ele.descriptors[0].map((obj)=>Object.values(obj)) };
          })
        );
      } else {
        res.send("No data found");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});


app.route("/createPatient").post(function (req, res) {
  const newItem = new RegInfo({
    First_name: req.body.First_name,
    Dob: req.body.dob,
    Gender: req.body.Gender,
    Address: req.body.Address,
    Phone: req.body.Phone,
    Blood_group: req.body.Blood_group,
    Chronic_Medical_Conditions: req.body.Chronic_Medical_Conditions,
    Long_term_ongoing_Medication: req.body.Long_term_ongoing_Medication,
    Email: req.body.Email,
  });

  newItem.save()
    .then(() => {
      res.send("SUCCESS");
    })
    .catch((err) => {
      console.log("FAIL", err);
      res.send("FAIL");
    });
});


app.route("/getPatient").get(function (req, res) {
  RegInfo.findOne({ Uid: req.body.uid }, function (err, foundPatient) {
    if (foundPatient) {
      res.send(foundPatient);
    } else {
      res.send(err);
    }
  });
});


app.route("/createAppointment").post(function (req, res) {
  console.log(req.body);
  const newItem = new Appointment({
    Date: req.body.Date,
    Time: req.body.Time,
    Doctor: req.body.Doctor,
    Uid: req.body.Uid,
  });

  newItem.save(function (err) {
    if (!err) {
      newItem.save(function (err) {
        if (!err) {
        } else {
          console.log("FAIL", err);
          res.send("FAIL");
        }
      });
      res.send("SUCCESS");
    } else {
      console.log("FAIL", err);
      res.send("FAIL");
    }
  });
});

app.route("/getAppointment").get(function (req, res) {
  Appointment.findOne({ uid: req.body.uid }, function (err, foundPatient) {
    if (foundPatient) {
      res.send(foundPatient);
    } else {
      res.send(err);
    }
  });
});

app.route("/getAllAppointments").get(function (req, res) {
  Appointment.find({}, function (err, foundPatient) {
    if (foundPatient) {
      res.send(foundPatient);
    } else {
      res.send(err);
    }
  });
});

// Item => People(patient)

// app.route("/updateItem").post(function (req, res) {
// 	const updatedItem = new Item({
// 		name: req.body.name,
// 		price: req.body.price,
// 		product_id: req.body.product_id,
// 		supplier_id: req.body.supplier_id,
// 		supplier_name: req.body.supplier_name,
// 	});
// 	Item.updateOne(
// 		{ product_id: req.body.product_id },
// 		{ $set: { ...req.body } },
// 		function (err) {
// 			if (err) {
// 				res.send(err);
// 			} else {
// 				res.send("SUCCESS");
// 			}
// 		}
// 	);
// });

// app.route("/deleteItem").post(function (req, res) {
// 	Item.deleteOne({ product_id: req.body.product_id }, function (err) {
// 		if (err) {
// 			res.send("fail");
// 		} else {
// 			res.send("success");
// 		}
// 	});
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
