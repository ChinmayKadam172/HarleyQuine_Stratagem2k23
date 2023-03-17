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
	"mongodb+srv://afif:admin@cluster0.vsylghq.mongodb.net/?retryWrites=true&w=majority"
);

const regInfo = {
	Uid: string,
	First_name: string,
	Dob: date,
	Gender: string,
	Address: string,
	Phone: string,
	Email: string,
	Blood_group: string,
	Chronic_Medical_Conditions: string,
	Long_term_ongoing_Medication: string,
};

const Appointment = {
	Date: date,
	Time: string,
	Doctor: string,
	Uid: string,
};

// schema land ends

const RegInfo = mongoose.model("RegInfo", regInfo);

console.log(PORT);

app.route("/create").post(function (req, res) {
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

	newItem.save(function (err) {
		if (!err) {
			newStock.save(function (err) {
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
