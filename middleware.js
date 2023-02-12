import { NextResponse } from "next/server";
import { useRecoilValue } from "recoil";
import LoginState from "./Atom/loginState";

export default function middleware(req) {
    let verify = req.cookies.get("loggedin")

    console.log(verify)
}