"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const index_1 = __importDefault(require("../controller/index"));
const adminController_1 = require("../controller/adminController");
const auth_1 = require("../../utils/auth");
const helperFun_1 = require("../../utils/helperFun");
// import {responseType} from "../../utils/helperFun"
router.get("/hello", auth_1.verify_token, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.decode,"decode");
    const controller = new adminController_1.AdminController(req, res);
    const response = yield controller.helloUser();
    console.log(response, "response");
    response.CatchResponse ? (0, helperFun_1.response_handler)(response.CatchResponse, res) : next(response.CatchError);
}));
router.post('/user/create', auth_1.verify_token, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new adminController_1.AdminController(req, res);
    const response = yield controller.New_Users(req.body);
    console.log(response, "response");
    response.CatchResponse ? (0, helperFun_1.response_handler)(response.CatchResponse, res) : next(response.CatchError);
}));
router.put('/user/update/:id', auth_1.verify_token, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new adminController_1.AdminController(req, res);
    (0, helperFun_1.object_id_check)(req.params.id, res);
    const response = yield controller.Update_userfun(req.body, req.params.id);
    console.log(response, "response");
    response.CatchResponse ? (0, helperFun_1.response_handler)(response.CatchResponse, res) : next(response.CatchError);
}));
router.delete('/user/delete/:id', auth_1.verify_token, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new adminController_1.AdminController(req, res);
    (0, helperFun_1.object_id_check)(req.params.id, res);
    const response = yield controller.Delete_Userfun(req.params.id);
    console.log(response, "response");
    response.CatchResponse ? (0, helperFun_1.response_handler)(response.CatchResponse, res) : next(response.CatchError);
    // return res.send(response)
}));
router.get('/users', auth_1.verify_token, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new adminController_1.AdminController(req, res);
    const response = yield controller.User_detailsfun();
    console.log(response, "response");
    response.CatchResponse ? (0, helperFun_1.response_handler)(response.CatchResponse, res) : next(response.CatchError);
    // return res.send(response)
}));
router.post('/user/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new adminController_1.AdminController(req, res);
    console.log(req.body, "admin route side");
    const response = yield controller.UserLoginFun(req.body);
    response.CatchResponse ? (0, helperFun_1.response_handler)(response.CatchResponse, res) : next(response.CatchError);
    // console.log(response,"responsegj");
}));
router.get('/users/:id', index_1.default.adminController.SingleUserDetail);
module.exports = router;
