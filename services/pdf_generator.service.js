// const PDFDocument = require("pdfkit");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const dateFormat = require("dateformat");
const commonService = require("../services/common.service");
const setupConfig = require("../config/setup.config");
const path = require("path");
const { AdditionalRecipient } = require("square-connect");
const rootDir = path.join(__dirname).replace("services", "");

exports.indentPdf = (invoice, res) => {
  let indent = invoice.body;
  console.log();
      let filePath = "uploads/"+indent.store_id+"/indents/"+indent.prf_number+".pdf";
  // let filePath = indent.prf_number+".pdf";
  let doc = new PDFDocument({ size: "A4", margin: 50 });
  generateHeader(doc);
  generateCustomerInfo(doc, indent);
  generateInvoiceTable(doc, indent);
  generateSupplierTable(doc,indent);
  // generateFooter(doc);
  let rootPath = rootDir+"uploads/"+indent.store_id+"/indents";
    if(!fs.existsSync(rootPath)) {
      fs.mkdir(rootPath, { recursive: true }, (err) => {
        if(!err) {
          let writeStream = fs.createWriteStream(rootDir+filePath);
          
          doc.pipe(writeStream);
          doc.end();
          writeStream.on('finish', function () {
          });
        }
        else {
         console.log("unable to create directory");
        }
      });
    }
    else {
      let writeStream = fs.createWriteStream(rootDir+filePath);
      doc.pipe(writeStream);
      doc.end();
      writeStream.on('finish', function () {
      });
    }
  // doc.pipe(fs.createWriteStream(rootDir + filePath));
};

function generateHeader(doc) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("DEV Inc.", 30, 57)
    .fontSize(10)
    // .text("123 Main Street", 200, 65, { align: "right" })
    // .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInfo(doc, invoice) {

  let invoiceTableTop = 130;
  doc
    .font("Times-Roman")
    .fillColor("#444444")
    .fontSize(20)
    .text("INDENT FORM", 220, invoiceTableTop - 10)
    .moveDown();
  // table;
  generateHr(doc, invoiceTableTop + 20);
  generateVr(doc, 30, invoiceTableTop + 20);
  
  doc.font("Helvetica");
  rowDetails = {
    field1: "Name",
    field2: "Deva",
  };

  generateTableRow(doc, invoiceTableTop + 30, rowDetails);
  generateHr(doc, invoiceTableTop + 50);
  rowDetails = {
    field1: "Designation",
    field2: "Head of Stores",
  };

  generateTableRow(doc, invoiceTableTop + 60, rowDetails);
  generateHr(doc, invoiceTableTop + 80);
  rowDetails = {
    field1: "Indent No",
    field2: `${invoice.prf_number}`,
  };

  generateTableRow(doc, invoiceTableTop + 90, rowDetails);
  generateHr(doc, invoiceTableTop + 110);
  rowDetails = {
    field1: "Indent Date",
    field2: `${dateFormat(invoice.prf_date, "dd mmm yyyy")}`,
  };

  generateTableRow(doc, invoiceTableTop + 120, rowDetails);
  generateHr(doc, invoiceTableTop + 140);
  rowDetails = {
    field1: "Site",
    field2: "TFC Main Store - CSK - Main Store Block",
  }

  generateTableRow(doc, invoiceTableTop + 150, rowDetails);
  generateHr(doc, invoiceTableTop + 170);
  rowDetails = {
    field1: "Purpose",
    field2: `${invoice.purpose}`,
  }

  generateVr(doc, 300, invoiceTableTop + 20);
  generateVr(doc, 565, invoiceTableTop + 20);

}

function generateInvoiceTable(doc,invoice){

  let requirements = invoice.requirement_list;
  invoiceTop = 400;

  doc
  .font("Times-Roman")
  .fillColor("#444444")
  .fontSize(20)
  .text("INDENT PRODUCT LIST", 180, invoiceTop-60)
  .moveDown();

  doc.font("Helvetica-Bold");
  generateHr(doc, invoiceTop - 10);
  generateInvoiceTableRow(
    doc,
    invoiceTop,
    "No",
    "Product Name",
    "Quantity",
    "Approx Price",
    "Required Date",
    "Stock",
    "Total",
    "grandTotal"
  );

  generateHr(doc, invoiceTop + 20);

  doc.font("Helvetica");
  let count = 0;
for (let index = 0; index < requirements.length; index++) {
  const requirement = requirements[index];
  let position = invoiceTop + (index + 1) * 30;

  if(index == 11){
    invoiceTop = 100
    doc.addPage()
    doc
    .font("Times-Roman")
    .fillColor("#444444")
    .fontSize(20)
    .text("INDENT PRODUCT LIST", 180, invoiceTop-60)
    .moveDown();
  
    doc.font("Helvetica-Bold");
    generateHr(doc, invoiceTop - 10);
    generateInvoiceTableRow(
      doc,
      invoiceTop,
      "No",
      "Product Name",
      "Quantity",
      "Approx Price",
      "Required Date",
      "Stock",
      "Total",
      "grandTotal"
    );
    generateHr(doc, invoiceTop + 20);
  }

  if (index >= 11) {
    position = 100 + (count + 1) * 30;
    count++;
  }
  doc.font("Helvetica");
  generateInvoiceTableRow(
    doc,
    position,
    index + 1,
    requirement.material,
    requirement.quantity + " " + requirement.unit,
    requirement.price,
   dateFormat(requirement.delivery_date,"dd mmm yyyy"),
   0,
    requirement.price * requirement.quantity,
  );
  generateHr(doc, position + 20)

    if (index == requirements.length -1) {
      invoiceTop = position;
      doc.font("Helvetica-Bold").text(`Grand Total     ${invoice.grand_total}`,440,position + 30),{ align: "justify" ,width: 10},generateSmallVr(doc,30, position +30),generateSmallVr(doc,500, position +30),generateSmallVr(doc,565, position +30);
      generateHr(doc, position + 50);
    }
  }
  doc.font("Helvetica")
}



function generateSupplierTable(doc,invoice){

  let suppliers = invoice.supplier_list;
  if (invoice.requirement_list.length <= 5 && suppliers.length <= 2) {
    invoiceTop += 150
  }else{
    invoiceTop += 200
    if (invoiceTop >= 520) {
      doc.addPage()
      invoiceTop = 100
    }
  }
  doc
  .font("Times-Roman")
  .fillColor("#444444")
  .fontSize(20)
  .text("SUPPLIER DETAILS", 210,invoiceTop - 50);

  doc.font("Helvetica-Bold");
  generateHr(doc, invoiceTop -10);
  generateSupplyTableRow(
    doc,
    invoiceTop,
    "No",
    "Name",
    "Reason",
    "Contact Person",
    "Mobile",
    "Address"
  );

  generateHr(doc, invoiceTop + 20);

  doc.font("Helvetica");
  for (let index = 0; index < suppliers.length; index++) {
    const supplier = suppliers[index];
    const position = invoiceTop + (index + 1) * 30;
  generateSupplyTableRow(
    doc,
    position,
    index + 1,
    supplier.company_name,
    supplier.reason,
    supplier.contact_person,
    supplier.mobile,
   supplier.comp_address,
  );

  generateHr(doc, position + 20)

  }
 
}

function generateTableRow(doc, y, rowDetails) {
  doc
    .fontSize(10)
    .text(rowDetails.field1, 40, y)
    .text(rowDetails.field2, 310, y,{ align: "left" });
    // .text(rowDetails.field3, 280, y, { align: "right" });
}

function generateInvoiceTableRow(
  doc,
  y,
  No,
  ProductName,
  Quantity,
  ApproxPrice,
  RequiredDate,
  Stock,
  Total
) {

  doc
    .fontSize(10)
    .text(No, 50, y,{ align: "justify",padding: "10" },generateSmallVr(doc,30, y ))
    .text(ProductName, 100, y,{ align: "justify" ,padding: "10"},generateSmallVr(doc,80, y))
    .text(Quantity, 190, y,{ align: "justify", width: 90 },generateSmallVr(doc,180, y))
    .text(ApproxPrice, 290, y,{ align: "left" },generateSmallVr(doc,280, y))
    .text(RequiredDate, 370, y,{ align: "justify" },generateSmallVr(doc,360, y))
    .text(Stock, 470, y,{ align: "justify" },generateSmallVr(doc,460, y))
    .text(Total, 510, y,{ align: "justify" },generateSmallVr(doc,500, y),generateSmallVr(doc,565, y))
    
}

function generateSupplyTableRow(
  doc,
  y,
  No,
  Name,
  Reason,
  ContactPerson,
  Mobile,
  Address,
) {

  doc
    .fontSize(10)
    .text(No, 50, y,{ align: "justify",padding: "10" },generateSmallVr(doc,30, y ))
    .text(Name, 100, y,{ align: "justify" ,padding: "10"},generateSmallVr(doc,80, y))
    .text(Reason, 190, y,{ align: "justify", width: 90 },generateSmallVr(doc,170, y))
    .text(ContactPerson, 270, y,{ align: "justify" },generateSmallVr(doc,260, y))
    .text(Mobile, 370, y,{ align: "justify" },generateSmallVr(doc,360, y))
    .text(Address, 470, y,{ align: "justify" },generateSmallVr(doc,460, y),generateSmallVr(doc,565, y))
    // .text(Total, 510, y,{ align: "justify" },generateSmallVr(doc,500, y),generateSmallVr(doc,565, y))
    
}


// lines
function generateHr(doc, y) {
  doc.strokeColor("#AAAAAA").lineWidth(1).moveTo(30, y).lineTo(565, y).stroke();
}

function generateVr(doc,x, y) {
  doc.strokeColor("#AAAAAA").lineWidth(1).moveTo(x, y + 150).lineTo(x, y).stroke();
}
function generateSmallVr(doc,x, y) {               //side  // start 532           //side   //to (hight)
  doc.strokeColor("#AAAAAA").lineWidth(1).moveTo(x, y - 10).lineTo(x, y + 20).stroke();
}

// function generateFooter(doc) {
//  doc.fontSize(
//    10,
//  ).text(
//    'Payment is due within 15 days. Thank you for your business.',
//    50,
//    780,
//    { align: 'center', width: 500 },
//  );
// }

// //For line
// function generateHr(doc, y) {
//   doc
//     .strokeColor("#AAAAAA")
//     .lineWidth(1)
//     .moveTo(50, y)
//     .lineTo(550, y)
//     .stroke();
// }

// exports.ysPayments = function(storeDetails, invoiceDetails) {
//   return new Promise((resolve, reject) => {
//     let filePath = "uploads/"+storeDetails._id+"/invoices/"+invoiceDetails._id+".pdf";
//     let subCharges = 0; let appCharges = 0;
//     let tranCharges = 0; let discount = 0;
//     if(invoiceDetails.order_type=='purchase_plan') {
//       subCharges = invoiceDetails.package_details.price;
//       discount = invoiceDetails.discount;
//     }
//     if(invoiceDetails.order_type=='purchase_app') {
//       appCharges = invoiceDetails.app_list.reduce((accumulator, currentValue) => {
//         return accumulator + currentValue['price'];
//       }, 0);
//     }
//     if(invoiceDetails.order_type=='plan_renewal') {
//       subCharges = invoiceDetails.package_details.price;
//       appCharges = invoiceDetails.app_list.reduce((accumulator, currentValue) => {
//         return accumulator + currentValue['price'];
//       }, 0);
//       tranCharges = invoiceDetails.transaction_charges;
//       discount = invoiceDetails.credit;
//     }
//     if(invoiceDetails.order_type=='plan_change') {
//       subCharges = invoiceDetails.package_details.price;
//       appCharges = invoiceDetails.app_list.reduce((accumulator, currentValue) => {
//         return accumulator + currentValue['price'];
//       }, 0);
//       tranCharges = invoiceDetails.transaction_charges;
//       discount = invoiceDetails.discount - invoiceDetails.credit;
//     }
//     let doc = new PDFDocument({ size: "A4", margin: 30 });
//     // Header
//     doc
//     .image(rootDir+"uploads/yourstore/logo.png", 35, 30, { width: 45 })
//     .fillColor("#444444")
//     .fontSize(8)
//     .text("by Estore Mastery", 30, 82)
//     .fontSize(10)
//     .text(dateFormat(new Date(), "dd mmm yyyy"), 0, 50, { align: "right" })
//     .font("Helvetica-Bold")
//     .fontSize(10)
//     .text(invoiceDetails.invoice_number, 0, 65, { align: "right", oblique: true })
//     .moveDown();
//     // line break
//     generateHr(doc, 105);
//     // title
//     doc
//     .fillColor("#444444")
//     .fontSize(18)
//     .text("Invoice for "+storeDetails.name, 30, 130);
//     // from
//     doc
//     .fontSize(11)
//     .text("From", 30, 180)
//     .font("Helvetica")
//     .text("EStore Mastery Systems Pvt. Ltd.", 30, 205)
//     .text(setupConfig.company_details.gst_no, 30, 223)
//     .text("14, Gulmohar Avenue, Velachery Main Road,", 30, 241)
//     .text("Guindy, Chennai", 30, 259)
//     .text("Tamil Nadu 600032", 30, 277);
//     // to
//     if(!storeDetails.gst_no) { storeDetails.gst_no = '-'; }
//     doc
//     .font("Helvetica-Bold")
//     .fontSize(11)
//     .text("Bill to", 320, 180)
//     .font("Helvetica")
//     .text(storeDetails.name, 320, 205)
//     .text(storeDetails.gst_no, 320, 223)
//     .text(storeDetails.company_details.address.replace(new RegExp('\n', 'g'), " "), 320, 241)

//     // table
//     let invoiceTableTop = 350;
//     doc.font("Helvetica-Bold");
//     let rowDetails = { "field1": "No.", "field2": "Description", "field3": "Outlay" };
//     generateTableRow(doc, invoiceTableTop, rowDetails);
//     generateHr(doc, invoiceTableTop+20);
//     doc.font("Helvetica");
//     rowDetails = { "field1": "1", "field2": "Platform Rental Charges", "field3": commonService.rupeesFormat(subCharges) };
//     generateTableRow(doc, invoiceTableTop+30, rowDetails);
//     generateHr(doc, invoiceTableTop+50);
//     rowDetails = { "field1": "2", "field2": "Advanced Feature Charges", "field3": commonService.rupeesFormat(appCharges) };
//     generateTableRow(doc, invoiceTableTop+60, rowDetails);
//     generateHr(doc, invoiceTableTop+80);
//     rowDetails = { "field1": "3", "field2": "Transaction Charges", "field3": commonService.rupeesFormat(tranCharges) };
//     generateTableRow(doc, invoiceTableTop+90, rowDetails);
//     generateHr(doc, invoiceTableTop+110);
//     rowDetails = { "field1": "4", "field2": "Discount", "field3": commonService.rupeesFormat(discount) };
//     generateTableRow(doc, invoiceTableTop+120, rowDetails);
//     generateHr(doc, invoiceTableTop+140);
//     invoiceTableTop += 60;

//     // tax
//     if(invoiceDetails.igst && invoiceDetails.igst.percentage) {
//       rowDetails = { "field1": "5", "field2": "Tax ("+invoiceDetails.igst.percentage+"% IGST)", "field3": commonService.rupeesFormat(invoiceDetails.igst.amount) };
//       generateTableRow(doc, invoiceTableTop+90, rowDetails);
//       generateHr(doc, invoiceTableTop+110);
//     }
//     if(invoiceDetails.cgst && invoiceDetails.cgst.percentage) {
//       rowDetails = { "field1": "5", "field2": "Tax ("+invoiceDetails.cgst.percentage+"% CGST)", "field3": commonService.rupeesFormat(invoiceDetails.cgst.amount) };
//       generateTableRow(doc, invoiceTableTop+90, rowDetails);
//       generateHr(doc, invoiceTableTop+110);
//     }
//     if(invoiceDetails.sgst && invoiceDetails.sgst.percentage) {
//       rowDetails = { "field1": "6", "field2": "Tax ("+invoiceDetails.sgst.percentage+"% SGST)", "field3": commonService.rupeesFormat(invoiceDetails.sgst.amount) };
//       generateTableRow(doc, invoiceTableTop+120, rowDetails);
//       generateHr(doc, invoiceTableTop+140);
//     }
//     doc
//     .font("Helvetica-Bold")
//     .fontSize(10)
//     .text('-', 30, invoiceTableTop+155)
//     .text('INVOICE GRAND TOTAL', 80, invoiceTableTop+155)
//     .text(commonService.rupeesFormat(invoiceDetails.amount), 280, invoiceTableTop+155, { align: "right" });
//     generateHr(doc, invoiceTableTop+175);
//     // final content
//     doc
//     .fontSize(11)
//     .text("Amount Paid: "+commonService.rupeesFormat(invoiceDetails.amount), 30, invoiceTableTop+200) // 600
//     .font("Helvetica")
//     .text("Note: The above prices are in "+invoiceDetails.currency_type.country_code, 30, invoiceTableTop+250);
//     // signature
//     doc
//     .fontSize(10)
//     .text("by Estore Mastery Systems Pvt. Ltd.", 0, invoiceTableTop+260, { align: "right" })
//     .strokeColor("#AAAAAA")
//     .lineWidth(1)
//     .moveTo(400, invoiceTableTop+335)
//     .lineTo(565, invoiceTableTop+335)
//     .stroke();
//     // footer
//     doc
//     .fontSize(10)
//     .text("Thank you for your business.", 30, 800, { align: "center", width: 500 });
    // let rootPath = rootDir+"uploads/"+storeDetails._id+"/invoices";
    // if(!fs.existsSync(rootPath)) {
    //   fs.mkdir(rootPath, { recursive: true }, (err) => {
    //     if(!err) {
    //       let writeStream = fs.createWriteStream(rootDir+filePath);
    //       doc.pipe(writeStream);
    //       doc.end();
    //       writeStream.on('finish', function () {
    //           console.log("124")
    //         resolve(true);
    //       });
    //     }
    //     else {
    //       resolve("unable to create directory");
    //     }
    //   });
    // }
    // else {
    //   let writeStream = fs.createWriteStream(rootDir+filePath);
    //   doc.pipe(writeStream);
    //   doc.end();
    //   writeStream.on('finish', function () {
    //     resolve(filePath);
    //   });
    // }
//   });
// }


// function Addition(value){

//   // appCharges = invoiceDetails.app_list.reduce((accumulator, currentValue) => {
//   //   //         return accumulator + currentValue['price'];
//   //   //       }, 0);


//   value.reduce((previous,current)=>{
//     return previous + current['total'];
//   },0);
// }
