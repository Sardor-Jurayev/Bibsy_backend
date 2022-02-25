import {
  PrismaClient,
  Prisma,
  BorrowDetails,
  Library,
  Students,
} from "@prisma/client";

type NumberLibrary = {
  ISBN: Number;
  Title: String;
  Author: String;
  // <<<<<<< Updated upstream
  // }

  // type NumberTemplate = {
  //     ID: Number;
  //     Name: string;
  //     Company: string;
  // }

  // export const ConvertBigIntObjects = (books:Library[]) => {
  //     //Library type with isbn as number instead of bigint
  //     let bookArray:NumberLibrary[] = [];

  //     books.map((book) => {
  //         //Decunstruct and parse object
  //         let ISBN = parseInt((books[0].ISBN).toString());
  //         let BookName = books[0].Title;
  //         let Author = books[0].Author;

  //         //Assembel object again
  //         let bookInfo = {
  //             ISBN: ISBN,
  //             BookName: BookName,
  //             Author: Author,
  //         }
  //         //Push to array
  //         bookArray.push(bookInfo);
  //     })
  //         return bookArray;
  // }

  // export const ConvertBigIntObject = (book:Library) => {
  //     //Library type with isbn as number instead of bigint

  //         //Decunstruct and parse object
  //         let ISBN = parseInt((book[0].ISBN).toString());
  //         let BookName = book[0].BookName;
  //         let Author = book.Author;

  //         //Assembel object again
  //         let bookInfo: NumberLibrary = {
  //             ISBN: ISBN,
  //             BookName: BookName,
  //             Author: Author,
  //         }

  //         return bookInfo;
  // }

  // // export const ConvertBigIntTemplate = (book:Template) => {
  // //     //Library type with isbn as number instead of bigint

  // //         //Decunstruct and parse object
  // //         let ID = parseInt((book.ID).toString());
  // //         let name = book.Name;
  // //         let company = book.Company;

  // //         //Assembel object again
  // //         let template: NumberTemplate = {
  // //             ID: ID,
  // //             Name: name,
  // //             Company: company,
  // //         }

  // //         console.log("MAMAMAMAM!");

  // //         return template;
  // // }
  // =======
  Publisher: String;
  Publish_Date: Date;
  NTI_s_ID: Number;
  Cover: String;
  Language: String;
  Description: String;
  Pages: Number;
};
export const ConvertBigIntObjects = (books: Library[]) => {
  //Library type with isbn as number instead of bigint
  let bookArray: NumberLibrary[] = [];
  books.map((book) => {
    //Assembel object again
    console.log(book[0].ISBN);
    let bookInfo = {
      ISBN: parseInt(book[0].ISBN.toString()),
      Title: book.Title,
      Author: books[0].Author,
      Publisher: books[0].Publisher,
      Publish_Date: books[0].Publish_Date,
      NTI_s_ID: book[0].NTI_s_ID,
      Cover: books[0].Cover,
      Language: books[0].Language,
      Description: books[0].Description,
      Pages: books[0].Pages,
    };
    //Push to array
    bookArray.push(bookInfo);
  });
  return bookArray;
};
// >>>>>>> Stashed changes
