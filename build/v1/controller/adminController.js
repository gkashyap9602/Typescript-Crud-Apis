"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const index_1 = require("../../models/index");
const helperFun_1 = require("../../utils/helperFun");
// import {} from "../../utils/helperFun";
const message_1 = require("../../utils/message");
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const operation_1 = require("../../services/operation");
const tsoa_1 = require("tsoa");
const auth_1 = require("../../utils/auth");
// console.log(http,"http");
let refreshTokens = [];
exports.default = {
    SingleUserDetail,
};
let AdminController = class AdminController extends tsoa_1.Controller {
    constructor(req, res) {
        super();
        this.req = req;
        this.res = res;
        this.userId = req.body.user ? req.body.user._id : '';
        this.userRole = req.body.user ? req.body.user.role : null;
    }
    User_detailsfun() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(this.userId, "userid token ");
                const users_details = yield index_1.AdminModels.ModelNewUser.find({ role: 3 }, "father_name mobileNum");
                const response = new helperFun_1.resp_Object(message_1.MESSAGES.DATA_RETREIVE_SUCCESSFULLY, http_status_codes_1.default.OK, users_details);
                return { CatchResponse: response };
            }
            catch (error) {
                return { CatchError: error };
            }
        });
    }
    New_Users(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcrypt_1.default.genSalt(10);
                const body = request;
                //  logic part of autogenerated username
                const today = new Date();
                const year = today.getFullYear().toString();
                const yearcode = parseInt(year.slice(-2));
                const usercount = yield index_1.AdminModels.ModelNewUser.find({
                    role: 3,
                }).count();
                const count = (usercount + 1).toString();
                const usercode = count.padStart(2, 0);
                // check if user alreday exist or not
                const finduser = yield index_1.AdminModels.ModelNewUser.findOne({
                    email: body.email,
                });
                console.log(finduser);
                if (finduser)
                    throw new helperFun_1.error_Object(message_1.MESSAGES.USER_ALREADY_REGISTERED, http_status_codes_1.default.UNPROCESSABLE_ENTITY);
                body.password = yield bcrypt_1.default.hash(body.password, salt);
                // // const student_img = req.file.path;
                // // Student_Data.student_img = student_img;
                // assigning a auto generated username to the user
                Object.assign(body, { username: "PS" + yearcode + usercode });
                const UserSaved = yield (0, operation_1.create)(body, index_1.AdminModels.ModelNewUser);
                //   await new AdminModels.ModelNewUser<userInterface>(body).save();
                const response = new helperFun_1.resp_Object(message_1.MESSAGES.USER_REGISTERED_SUCCESSFULLY, http_status_codes_1.default.CREATED, UserSaved);
                return { CatchResponse: response };
            }
            catch (error) {
                console.log(error, "err catchhhh side ");
                return { CatchError: error };
            }
        });
    }
    Update_userfun(request, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = id;
                console.log(user_id, "idd");
                const body = request;
                console.log(body, "body or request");
                if (!body)
                    throw new helperFun_1.error_Object("Something Not Right Data Not Recieved Please Enter Data", http_status_codes_1.default.EXPECTATION_FAILED);
                const find = yield index_1.AdminModels.ModelNewUser.findOne({ _id: user_id });
                if (!find)
                    throw new helperFun_1.error_Object(message_1.MESSAGES.DOES_NOT_EXIST, http_status_codes_1.default.EXPECTATION_FAILED);
                const UserUpdated = yield index_1.AdminModels.ModelNewUser.findByIdAndUpdate(user_id, body, { new: true });
                const response = new helperFun_1.resp_Object(message_1.MESSAGES.UPDATED_SUCCESSFULLY, http_status_codes_1.default.CREATED);
                return { CatchResponse: response };
            }
            catch (error) {
                // console.log("something not right" + error);
                return { CatchError: error };
            }
        });
    }
    Delete_Userfun(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = id;
                console.log(user_id);
                const find = yield index_1.AdminModels.ModelNewUser.findOne({ _id: user_id });
                if (!find)
                    throw new helperFun_1.error_Object(message_1.MESSAGES.DOES_NOT_EXIST, http_status_codes_1.default.EXPECTATION_FAILED);
                const deleted = yield index_1.AdminModels.ModelNewUser.findByIdAndDelete(user_id);
                const response = new helperFun_1.resp_Object(message_1.MESSAGES.DELETED_SUCCESSFULLY, http_status_codes_1.default.ACCEPTED);
                return { CatchResponse: response };
            }
            catch (error) {
                // console.log("something not right" + error);
                return { CatchError: error };
            }
        });
    }
    UserLoginFun(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(request, "request");
                const { email, password } = request;
                console.log(email, password, "email passs");
                // find if user exist or not
                const Userdata = yield index_1.AdminModels.ModelNewUser.findOne({ email: email });
                if (!Userdata)
                    throw new helperFun_1.error_Object(message_1.MESSAGES.USER_NOT_VALID, http_status_codes_1.default.UNAUTHORIZED);
                const user_id = Userdata._id;
                // await bcrypt.compare(request.Lpassword, loginuser.Password)
                if (yield bcrypt_1.default.compare(password, Userdata.password)) {
                    //generating jwt token
                    const token = (0, auth_1.genAuthToken)(user_id);
                    if (!token)
                        throw new helperFun_1.error_Object(message_1.MESSAGES.TOKEN_NOT_GENERATED, http_status_codes_1.default.NOT_FOUND);
                    //   console.log(token, "token login side");
                    refreshTokens.push(token.refresh_token);
                    const response = new helperFun_1.resp_Object(message_1.MESSAGES.LOGIN_SUCCESSFULLY, http_status_codes_1.default.ACCEPTED, {
                        AccessToken: token.Access_token,
                        RefreshToken: token.refresh_token,
                    });
                    return { CatchResponse: response };
                }
                else {
                    throw new helperFun_1.error_Object(message_1.MESSAGES.PASSWORD_NOT_MATCHED, http_status_codes_1.default.UNAUTHORIZED);
                }
            }
            catch (error) {
                return { CatchError: error };
            }
        });
    }
    helloUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = new helperFun_1.resp_Object("Hello User Authenticated Successfully", 202);
                return { CatchResponse: response };
            }
            catch (error) {
                return { CatchError: error };
            }
        });
    }
};
__decorate([
    (0, tsoa_1.Security)("Bearer"),
    (0, tsoa_1.Get)("/users")
], AdminController.prototype, "User_detailsfun", null);
__decorate([
    (0, tsoa_1.Security)("Bearer"),
    (0, tsoa_1.Post)("/user/create"),
    __param(0, (0, tsoa_1.Body)())
], AdminController.prototype, "New_Users", null);
__decorate([
    (0, tsoa_1.Security)("Bearer"),
    (0, tsoa_1.Put)("/user/update/:id"),
    __param(0, (0, tsoa_1.Body)())
], AdminController.prototype, "Update_userfun", null);
__decorate([
    (0, tsoa_1.Security)("Bearer"),
    (0, tsoa_1.Delete)("/user/delete/:id")
], AdminController.prototype, "Delete_Userfun", null);
__decorate([
    (0, tsoa_1.Post)("/user/login"),
    __param(0, (0, tsoa_1.Body)())
], AdminController.prototype, "UserLoginFun", null);
__decorate([
    (0, tsoa_1.Security)("Bearer"),
    (0, tsoa_1.Get)("/hello")
], AdminController.prototype, "helloUser", null);
AdminController = __decorate([
    (0, tsoa_1.Tags)("Admin"),
    (0, tsoa_1.Route)("/admin")
], AdminController);
exports.AdminController = AdminController;
function SingleUserDetail(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user_id = req.params.id;
            const userdata = yield index_1.AdminModels.ModelNewUser.find({ _id: user_id }, { password: 0 });
            const response = new helperFun_1.resp_Object(message_1.MESSAGES.DATA_RETREIVE_SUCCESSFULLY, http_status_codes_1.default.OK, userdata);
            res.send(response);
        }
        catch (error) {
            next(error);
        }
    });
}
