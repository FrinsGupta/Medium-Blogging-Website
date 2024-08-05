"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBlogSchema = exports.CreateBlogSchema = exports.SignInSchema = exports.SignUpSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.SignUpSchema = zod_1.default.object({
    name: zod_1.default.string(),
    email: zod_1.default.string().email().endsWith('@gmail.com'),
    password: zod_1.default.string().min(6)
});
exports.SignInSchema = zod_1.default.object({
    email: zod_1.default.string().email().endsWith('@gmail.com'),
    password: zod_1.default.string().min(6)
});
exports.CreateBlogSchema = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string()
});
exports.UpdateBlogSchema = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    id: zod_1.default.number()
});
