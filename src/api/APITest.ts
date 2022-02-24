// //Import modules
import { Request, Response } from "express";

import {
  PrismaClient,
  Prisma,
  BorrowDetails,
  Library,
  Students,
} from "@prisma/client";

import {
  ConvertBigIntObjects,
  //  ConvertBigIntObject
} from "../bigIntConvert";
import cors from "cors";
//import { getBookInfo } from '../PrivateBookAPI/getBookInfo';
import bCrypt from "bcryptjs";

const prisma = new PrismaClient();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const nodePort = 9823;
let bodyparsee = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    accept: "*",
    method: "POST, GET",
  })
);
async function FetchPass(userName, ggpassword) {
  const query = await prisma.login
    .findUnique({
      where: {
        UserName: userName,
      },
      select: {
        PassWord: true,
      },
    })
    .then((response) => {
      const tester: any = response.PassWord;
      if (!tester == ggpassword) {
        return true;
        console.log("Password is incorrect");
      }
      console.log("Password is correct");
      return false;
    });
}
app.listen(nodePort, () => {
  console.log("Listening on: " + nodePort);
});
type NumberLibrary = {
  ISBN: Number;
  Title: String;
  Author: String;
  Publisher: String;
  Publish_Date: Date;
  NTI_s_ID: Number;
  Cover: String;
  Language: String;
  Description: String;
  Pages: Number;
};
app.get("/books", async (req: Request, res: Response) => {
  //Call prismas findMany method on library
  const books = await prisma.library
    .findMany()
    .then((böcker) => {
      //BigInt is not supported by json we have to convert to Number and then to object again... 🤬
      let bookArray: NumberLibrary[] = [];
      böcker.map((book) => {
        //Assembel object again
        let bookInfo = {
          ISBN: parseInt(book.ISBN.toString()),
          Title: book.Title,
          Author: book.Author,
          Publisher: book.Publisher,
          Publish_Date: book.Publish_Date,
          NTI_s_ID: book.NTI_s_ID,
          Cover: book.Cover,
          Language: book.Language,
          Description: book.Description,
          Pages: book.Pages,
        };
        //Push to array
        bookArray.push(bookInfo);
      });

      res.status(200).json(bookArray);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
});
app.get("/missing", async (req: Request, res: Response) => {
  //Call prismas findMany method on library
  const books = await prisma.library
    .findMany()

    .then((böcker) => {
      console.log(böcker);
      //BigInt is not supported by json we have to convert to Number and then to object again... 🤬
      let convertedBooks = ConvertBigIntObjects(böcker);

      res.status(200).json(convertedBooks);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
});

app.get("/students", async (req: Request, res: Response) => {
  //Call prismas findMany method on students
  const students = await prisma.students
    .findMany()
    .then((students) => {
      res.status(200).send(students);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
});

app.get("/staff", async (req: Request, res: Response) => {
  //Call prismas findMany method on students
  const staff = await prisma.staff
    .findMany()
    .then((staff) => {
      console.log(staff);
      res.status(200).send(staff);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
});
