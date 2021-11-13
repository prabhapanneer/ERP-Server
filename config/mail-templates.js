const setupConfig = require("../config/setup.config");

// CUSTOMERS
exports.signup = function (storeDetails) {
  return new Promise((resolve, reject) => {
    let contactEmail = storeDetails.email;
    let mailConfig = storeDetails.mail_config;
    if (mailConfig.transporter) {
      contactEmail = mailConfig.transporter.auth.user;
    }
    let tempConfig = mailConfig.template_config;
    if (storeDetails.type == "restaurant_based") {
      // header
      let html = createRestaurantHeader(storeDetails);
      // main content
      html +=
        "<div style='font-size:30px;padding-top:15px;padding-left: 25px; padding-right: 25px;line-height:100%;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'> <h1 style='font-size: 1rem;line-height: 2rem;' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1rem;margin-top: 20px;margin-bottom: 20px;'>Welcome to " +
        storeDetails.name +
        "!</h1> <p style='max-width:750px;color:rgba(0,0,0,0.64);font-size: 0.875rem;font-weight:500;line-height: 1.75rem;margin-bottom: 32px;font-family: " +
        tempConfig.font_family +
        "!important;'>To make your ordering hassle-free, whenever you visit our site, login to your account by clicking <br> <a href='" +
        storeDetails.base_url +
        "/account' style='color: #000;font-weight:600;text-decoration:underline'>My Account</a> at the top of every page and then enter your email address and password.</p> <p style='padding-top: 0px;font-size: 0.875rem;margin-top: 48px;margin-bottom: 32px;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'>When you login to your account, you will be able to do the following:</p> <ul style='padding-left: 20px;margin-top: 16px;margin-bottom: 64px;font-family: " +
        tempConfig.font_family +
        "!important;'> <li style='color:rgba(0,0,0,0.64);font-size:0.875rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Proceed through checkout faster when making a purchase</li> <li style='color:rgba(0,0,0,0.64);font-size:0.875rem;padding-top:10px;font-family: " +
        tempConfig.font_family +
        "!important;'>Check the status of orders</li> <li style='color:rgba(0,0,0,0.64);font-size:0.875rem;padding-top:10px;font-family: " +
        tempConfig.font_family +
        "!important;'>View past orders</li> <li style='color:rgba(0,0,0,0.64);font-size:0.875rem;padding-top:10px;font-family: " +
        tempConfig.font_family +
        "!important;'>Track your order</li> <li style='color:rgba(0,0,0,0.64);font-size:0.875rem;padding-top:10px;font-family: " +
        tempConfig.font_family +
        "!important;'>Make changes to your account information</li> <li style='color:rgba(0,0,0,0.64);font-size:0.875rem;padding-top:10px;font-family: " +
        tempConfig.font_family +
        "!important;'>Change your password</li> <li style='color:rgba(0,0,0,0.64);font-size:0.875rem;padding-top:10px;font-family: " +
        tempConfig.font_family +
        "!important;'>Save alternate addresses (for shipping to multiple family members and friends)</li> </ul> <p style='max-width:720px;padding-top: 0px;padding-bottom: 64px;font-size: 0.875rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> If you have any questions about your order, please contact us at <a style='color:#000;font-weight:600;' href='mailto:" +
        contactEmail +
        "'>" +
        contactEmail +
        "</a>";
      if (mailConfig.contact_no) {
        html +=
          " or call us at <a style='color:#000;font-weight:600;' href='tel:" +
          mailConfig.contact_no +
          "'>" +
          mailConfig.contact_no +
          "</a>";
      }
      html += "</p></div>";
      // footer
      html += createRestaurantFooter(storeDetails);
      resolve(html);
    } else {
      // header
      let html = createGeneralHeader(storeDetails);
      // main content
      html +=
        "<div style='font-size:30px;padding-top:15px;padding-left: 25px; padding-right: 25px;line-height:100%;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'> <h1 style='font-size: 1.25rem;line-height: 2rem;' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1.25rem;margin-top: 32px;margin-bottom: 32px;'>Welcome to " +
        storeDetails.name +
        "!</h1> <p style='max-width:750px;color:rgba(0,0,0,0.64);font-size: 1rem;font-weight:500;line-height: 1.75rem;margin-bottom: 32px;font-family: " +
        tempConfig.font_family +
        "!important;'>To make your shopping hassle-free, whenever you visit our site, login to your account by clicking <br> <a href='" +
        storeDetails.base_url +
        "/account' style='color: #000;font-weight:600;text-decoration:underline'>My Account</a> at the top of every page and then enter your email address and password.</p> <p style='padding-top: 0px;font-size: 1rem;margin-top: 48px;margin-bottom: 32px;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'>When you login to your account, you will be able to do the following:</p> <ul style='padding-left: 20px;margin-top: 16px;margin-bottom: 64px;font-family: " +
        tempConfig.font_family +
        "!important;'> <li style='color:rgba(0,0,0,0.64);font-size: 1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Proceed through checkout faster when making a purchase</li> <li style='color:rgba(0,0,0,0.64);font-size: 1rem;padding-top:10px;font-family: " +
        tempConfig.font_family +
        "!important;'>Check the status of orders</li> <li style='color:rgba(0,0,0,0.64);font-size: 1rem;padding-top:10px;font-family: " +
        tempConfig.font_family +
        "!important;'>View past orders</li> <li style='color:rgba(0,0,0,0.64);font-size: 1rem;padding-top:10px;font-family: " +
        tempConfig.font_family +
        "!important;'>Track your order</li> <li style='color:rgba(0,0,0,0.64);font-size: 1rem;padding-top:10px;font-family: " +
        tempConfig.font_family +
        "!important;'>Make changes to your account information</li> <li style='color:rgba(0,0,0,0.64);font-size: 1rem;padding-top:10px;font-family: " +
        tempConfig.font_family +
        "!important;'>Change your password</li> <li style='color:rgba(0,0,0,0.64);font-size: 1rem;padding-top:10px;font-family: " +
        tempConfig.font_family +
        "!important;'>Save alternate addresses (for shipping to multiple family members and friends)</li> </ul> <p style='max-width:720px;padding-top: 0px;padding-bottom: 64px;font-size: 1rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> If you have any questions about your order, please contact us at <a style='color:#000;font-weight:600;' href='mailto:" +
        contactEmail +
        "'>" +
        contactEmail +
        "</a>";
      if (mailConfig.contact_no) {
        html +=
          " or call us at <a style='color:#000;font-weight:600;' href='tel:" +
          mailConfig.contact_no +
          "'>" +
          mailConfig.contact_no +
          "</a>";
      }
      html += "</p></div>";
      // footer
      html += createGeneralFooter(storeDetails);
      resolve(html);
    }
  });
};

exports.pwd_recovery = function (storeDetails) {
  return new Promise((resolve, reject) => {
    let mailConfig = storeDetails.mail_config;
    let tempConfig = mailConfig.template_config;
    if (storeDetails.type == "restaurant_based") {
      // header
      let html = createRestaurantHeader(storeDetails);
      // main content
      html +=
        "<div style='font-size:30px;padding-top:15px;padding-left: 25px;padding-bottom:30px; padding-right: 25px;line-height:100%;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'> <h1 style='font-size: 1rem;line-height: 2rem;' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1rem;margin-top: 20px;margin-bottom: 20px;'>Forgot your password?</h1> <p style='color:rgba(0,0,0,0.64); font-size:0.875rem; font-weight:500;line-height: 1.75rem;margin-bottom: 32px;font-family: " +
        tempConfig.font_family +
        "!important;'> You are just a step away from accessing your " +
        storeDetails.name +
        " account. <br/> Please click the link below to reset your password. This link is valid for 60 minutes and usable only once.</p> <div style='color:#000;font-size:0.75rem;padding:48px 0px;font-family: " +
        tempConfig.font_family +
        "!important;' align='center'> <a href='##recovery_link##' style='font-weight:600;text-decoration: none; background-color:" +
        tempConfig.theme_color +
        ";color:" +
        tempConfig.txt_color +
        "!important; padding:1.25rem 1.75rem; line-height: 20px; font-size: 0.75rem;font-family: " +
        tempConfig.font_family +
        "!important;' align='center'>RESET YOUR PASSWORD</a> </div> </div>";
      // footer
      html += createRestaurantFooter(storeDetails);
      resolve(html);
    } else {
      // header
      let html = createGeneralHeader(storeDetails);
      // main content
      html +=
        "<div style='font-size:30px;padding-top:15px;padding-left: 25px;padding-bottom:30px; padding-right: 25px;line-height:100%;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'> <h1 style='font-size: 1.25rem;line-height: 2rem;' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1.25rem;margin-top: 32px;margin-bottom: 32px;'>Forgot your password?</h1> <p style='color:rgba(0,0,0,0.64); font-size:1rem; font-weight:500;line-height: 1.75rem;margin-bottom: 32px;font-family: " +
        tempConfig.font_family +
        "!important;'> You are just a step away from accessing your " +
        storeDetails.name +
        " account. <br/> Please click the link below to reset your password. This link is valid for 60 minutes and usable only once.</p> <div style='color:#000;font-size:0.875rem;padding:48px 0px;font-family: " +
        tempConfig.font_family +
        "!important;' align='center'> <a href='##recovery_link##' style='font-weight:600;text-decoration: none; background-color:" +
        tempConfig.theme_color +
        ";color:" +
        tempConfig.txt_color +
        "!important; padding:1.25rem 1.75rem; line-height: 20px; font-size: 0.875rem;font-family: " +
        tempConfig.font_family +
        "!important;' align='center'>RESET YOUR PASSWORD</a> </div> </div>";
      // footer
      html += createGeneralFooter(storeDetails);
      resolve(html);
    }
  });
};

exports.pwd_updated = function (storeDetails) {
  return new Promise((resolve, reject) => {
    let contactEmail = storeDetails.email;
    let mailConfig = storeDetails.mail_config;
    if (mailConfig.transporter) {
      contactEmail = mailConfig.transporter.auth.user;
    }
    let tempConfig = mailConfig.template_config;
    if (storeDetails.type == "restaurant_based") {
      // header
      let html = createRestaurantHeader(storeDetails);
      // main content
      html +=
        "<div style='font-size:30px;padding-top:15px;padding-left: 25px;padding-bottom:30px; padding-right: 25px;line-height:100%;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'> <h1 style='font-size: 1rem;line-height: 2rem;' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1rem;margin-top: 20px;margin-bottom: 20px;'>Password reset.</h1> <p style='color:rgba(0,0,0,0.64); font-size:0.875rem; font-weight:500;line-height: 1.75rem;margin-bottom: 32px;'>The password for your " +
        storeDetails.name +
        " account ##email## was recently changed on <br/>##time##.</p> <p style='max-width:720px;padding-top: 30px;padding-bottom: 36px;font-size: 0.875rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'>If you don't recognize this activity, please get in touch with us at <a style='color:#000;font-weight:600;' href='mailto:" +
        contactEmail +
        "'>" +
        contactEmail +
        "</a> </p> </div>";
      // footer
      html += createRestaurantFooter(storeDetails);
      resolve(html);
    } else {
      // header
      let html = createGeneralHeader(storeDetails);
      // main content
      html +=
        "<div style='font-size:30px;padding-top:15px;padding-left: 25px;padding-bottom:30px; padding-right: 25px;line-height:100%;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'> <h1 style='font-size: 1.25rem;line-height: 2rem;' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1.25rem;margin-top: 32px;margin-bottom: 32px;'>Password reset.</h1> <p style='color:rgba(0,0,0,0.64); font-size:1rem; font-weight:500;line-height: 1.75rem;margin-bottom: 32px;'>The password for your " +
        storeDetails.name +
        " account ##email## was recently changed on <br/>##time##.</p> <p style='max-width:720px;padding-top: 30px;padding-bottom: 36px;font-size: 1rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'>If you don't recognize this activity, please get in touch with us at <a style='color:#000;font-weight:600;' href='mailto:" +
        contactEmail +
        "'>" +
        contactEmail +
        "</a> </p> </div>";
      // footer
      html += createGeneralFooter(storeDetails);
      resolve(html);
    }
  });
};

exports.abandoned = function (storeDetails) {
  return new Promise((resolve, reject) => {
    let contactEmail = storeDetails.email;
    let mailConfig = storeDetails.mail_config;
    if (mailConfig.transporter) {
      contactEmail = mailConfig.transporter.auth.user;
    }
    let tempConfig = mailConfig.template_config;
    // header
    let html = createGeneralHeader(storeDetails);
    // main content
    html +=
      "<div style='font-size:30px;padding-top:15px;padding-left: 25px;padding-bottom:30px; padding-right: 25px;line-height:100%;font-family: " +
      tempConfig.font_family +
      "!important' align='left'> <h1 style='font-size: 1.25rem;line-height: 2rem;' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1.25rem;margin-top: 32px;margin-bottom: 32px;'>Forgot something?</h1> <p style='color:rgba(0,0,0,0.64); font-size:1rem; font-weight:500;line-height: 1.75rem;margin-bottom: 32px;'>We noticed that you added one or more products to your shopping bag on our website <a style='color:" +
      tempConfig.theme_color +
      ";font-weight:600' href='" +
      storeDetails.base_url +
      "'>" +
      storeDetails.website +
      "</a> but didn’t continue to checkout.</p> <p style='color:rgba(0,0,0,0.64); font-size:1rem; font-weight:500;line-height: 1.75rem;margin-bottom: 32px;'> If you were not able to complete the order due to any issue, please click the COMPLETE YOUR PURCHASE button below. </p> <table align='center'> <tr> <td> <a style='font-weight:600;text-decoration: none;' href='" +
      storeDetails.base_url +
      "'> <p style='background-color:" +
      tempConfig.theme_color +
      ";color:" +
      tempConfig.txt_color +
      "!important; padding:20px 25px; line-height: 20px; font-size: 14px; letter-spacing: 1px;font-family: " +
      tempConfig.font_family +
      "!important' align='center'>COMPLETE YOUR PURCHASE</p> </a> </td> </tr> </table> <p style='padding-top: 0px;font-size: 1rem;margin-top: 48px;margin-bottom: 24px;' align='left'> You can perform the following actions: </p> <ul style='padding-left: 20px;margin-top: 16px;margin-bottom: 64px;'> <li style='color:rgba(0,0,0,0.64);font-size: 1rem;'> Click the above link </li> <li style='color:rgba(0,0,0,0.64);font-size: 1rem;padding-top:10px;'> If you hold an international card, there may be some payment gateway related security issues with your bank. Kindly try placing an order once again </li> <li style='color:rgba(0,0,0,0.64);font-size: 1rem;padding-top:10px;'> Our Payment Gateways accepts international and domestic debit + credit cards </li> <li style='color:rgba(0,0,0,0.64);font-size: 1rem;padding-top:10px;'> Delete your browsing history/cache and take minimal time for entering the details </li> <li style='color:rgba(0,0,0,0.64);font-size: 1rem;padding-top:10px;'> If it was a technical issue or any other problem, please send us a screenshot, so we can help you </li> <li style='color:rgba(0,0,0,0.64);font-size: 1rem;padding-top:10px;'> In case you have changed your mind about buying, kindly ignore this mail </li> </ul> <p style='max-width:720px;padding-top: 0px;padding-bottom: 36px;font-size: 1rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> Explore our new arrivals that we keep posting on our website and fill up your carts! <br> If you have any questions about your order, please contact us at <a style='color:#000;font-weight:600;' href='mailto:" +
      contactEmail +
      "'>" +
      contactEmail +
      "</a>";
    if (mailConfig.contact_no) {
      html +=
        " or call us at <a style='color:#000;font-weight:600;' href='tel:" +
        mailConfig.contact_no +
        "'>" +
        mailConfig.contact_no +
        "</a>";
    }
    html += "</p></div>";
    // footer
    html += createGeneralFooter(storeDetails);
    resolve(html);
  });
};

exports.order_placed = function (storeDetails) {
  return new Promise((resolve, reject) => {
    let contactEmail = storeDetails.email;
    let mailConfig = storeDetails.mail_config;
    if (mailConfig.transporter) {
      contactEmail = mailConfig.transporter.auth.user;
    }
    let tempConfig = mailConfig.template_config;
    if (storeDetails.type == "restaurant_based") {
      // header
      let html = createRestaurantHeader(storeDetails);
      // main content
      html +=
        "<div style='font-size:30px;padding-top:15px;padding-left: 25px;padding-bottom:30px; padding-right: 25px;line-height:100%;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'> <h1 style='font-size: 1rem;line-height: 2rem;' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1rem;margin-top: 20px;margin-bottom: 20px;'>Thank you for your order!</h1> <p style='color:rgba(0,0,0,0.64); font-size:0.875rem; font-weight:500;line-height: 1.75rem;margin-bottom: 32px;'>We have received your order with order ID ##order_number## and we are processing the same.</p> <div style='font-size:0.875rem; width:100%; padding-top:16px;font-family: " +
        tempConfig.font_family +
        "!important;'> <table width='' border='0' style='min-width:80%;max-width:100%;font-family: " +
        tempConfig.font_family +
        "!important;'> <tr> <td align='center' style='width:48%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;color:#000;word-break: break-all;font-family: " +
        tempConfig.font_family +
        "!important;'>Billing Information</td> <td>&nbsp;</td> <td align='center' style='width:48%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;color:#000;word-break: break-all;font-family: " +
        tempConfig.font_family +
        "!important;'>Shipping Information</td> </tr> <tr> <td style='word-break: break-all;'> <p style='padding-left: 0px;color:rgba(0,0,0,0.64);font-size:0.75rem; font-weight:500;line-height: 2rem;font-family: " +
        tempConfig.font_family +
        "!important;'> ##billing_address## </p> </td> <td>&nbsp;</td> <td style='word-break: break-all;'> <p style='padding-left: 0px;color:rgba(0,0,0,0.64);font-size:0.75rem; font-weight:500;line-height: 2rem;font-family: " +
        tempConfig.font_family +
        "!important;'> ##shipping_address## </p> </td> </tr> </table> </div> <div style='##payment_style##;  width:100%; padding-top:40px;font-family: " +
        tempConfig.font_family +
        "!important;'> <p style='max-width:720px;padding-bottom: 32px;font-size: 0.875rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> Payment Method: ##payment_method## </p> </div> <div style='font-size:0.75rem;color:#000; width:100%; padding-top:10px;padding-bottom:64px;overflow-x:auto;font-family: " +
        tempConfig.font_family +
        "!important;'> <table width='100%' border='0' cellpadding='0' cellspacing='0'> <tr style='padding:1rem 1rem;font-size:0.75rem;'> <td style='width:55%;font-size:0.75rem;background-color: #f6f6f6;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Item</td> <td style='width:15%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>SKU</td> <td style='width:15%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Qty.</td> <td style='width:15%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> </tr> ##item_list## <tr> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>##sub_total##</td> </tr> <tr style='##gw_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Gift Wrapping</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##gw_amount##</td> </tr> <tr style='##pack_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Packaging Charges</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##pack_amount##</td> </tr> <tr> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Shipping and Handling</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##shipping_cost##</td> </tr> <tr style='##cod_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>COD Charges</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##cod_amount##</td> </tr> <tr style='##discount_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Discount</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##discount_amount##</td> </tr> <tr> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Grand Total</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##grand_total##</td> </tr> </table> </div> <p style='max-width:720px;padding-top: 0px;padding-bottom: 36px;font-size: 0.875rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;font-family: " +
        tempConfig.font_family +
        "!important;'> Once the order is dispatched, you would receive an email with the tracking details to track your order. <br> You can check the status of your order by logging into your account. <br> If you have any questions about your order, please contact us at <a style='color:#000;font-weight:600;' href='mailto:" +
        contactEmail +
        "'>" +
        contactEmail +
        "</a>";
      if (mailConfig.contact_no) {
        html +=
          " or call us at <a style='color:#000;font-weight:600;' href='tel:" +
          mailConfig.contact_no +
          "'>" +
          mailConfig.contact_no +
          "</a>";
      }
      html += "</p></div>";
      // footer
      html += createRestaurantFooter(storeDetails);
      resolve(html);
    } else {
      // header
      let html = createGeneralHeader(storeDetails);
      // main content
      html +=
        "<div style='font-size:30px;padding-top:15px;padding-left: 25px;padding-bottom:30px; padding-right: 25px;line-height:100%;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'> <h1 style='font-size: 1.25rem;line-height: 2rem;' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1.25rem;margin-top: 32px;margin-bottom: 32px;'>Thank you for your order!</h1> <p style='color:rgba(0,0,0,0.64); font-size:1rem; font-weight:500;line-height: 1.75rem;margin-bottom: 32px;'>We have received your order with order ID ##order_number## and we are processing the same.</p> <div style='font-size:1rem; width:100%; padding-top:16px;font-family: " +
        tempConfig.font_family +
        "!important;'> <table width='' border='0' style='min-width:80%;max-width:100%;font-family: " +
        tempConfig.font_family +
        "!important;'> <tr> <td align='center' style='width:48%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;color:#000;word-break: break-all;font-family: " +
        tempConfig.font_family +
        "!important;'>Billing Information</td> <td>&nbsp;</td> <td align='center' style='width:48%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;color:#000;word-break: break-all;font-family: " +
        tempConfig.font_family +
        "!important;'>Shipping Information</td> </tr> <tr> <td style='word-break: break-all;'> <p style='padding-left: 0px;color:rgba(0,0,0,0.64);font-size:15px; font-weight:500;line-height: 2rem;font-family: " +
        tempConfig.font_family +
        "!important;'> ##billing_address## </p> </td> <td>&nbsp;</td> <td style='word-break: break-all;'> <p style='padding-left: 0px;color:rgba(0,0,0,0.64);font-size:15px; font-weight:500;line-height: 2rem;font-family: " +
        tempConfig.font_family +
        "!important;'> ##shipping_address## </p> </td> </tr> </table> </div> <div style='##payment_style##;  width:100%; padding-top:40px;font-family: " +
        tempConfig.font_family +
        "!important;'> <p style='max-width:720px;padding-bottom: 32px;font-size: 1rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> Payment Method: ##payment_method## </p> </div> <div style='font-size:1rem;color:#000; width:100%; padding-top:10px;padding-bottom:64px;overflow-x:auto;font-family: " +
        tempConfig.font_family +
        "!important;'> <table width='100%' border='0' cellpadding='0' cellspacing='0'> <tr style='padding:1rem 2.5rem;font-size:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'> <td style='width:40%;font-size:1rem;background-color: #f6f6f6;padding-left:20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Item</td> <td style='width:20%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>SKU</td> <td style='width:15%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Qty.</td> <td style='width:25%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> </tr>##item_list## <tr> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>##sub_total##</td> </tr> <tr style='##gw_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Gift Wrapping</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##gw_amount##</td> </tr> <tr style='##pack_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Packaging Charges</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##pack_amount##</td> </tr> <tr> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Shipping and Handling</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##shipping_cost##</td> </tr> <tr style='##cod_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>COD Charges</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##cod_amount##</td> </tr> <tr style='##discount_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Discount</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>-##discount_amount##</td> </tr> <tr> <td>&nbsp;</td> <td style='color:#000;font-size:1.25rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Grand Total</td> <td>&nbsp;</td> <td style='color:#000;font-size:1.25rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##grand_total##</td> </tr> </table> </div> <p style='max-width:720px;padding-top: 0px;padding-bottom: 36px;font-size: 1rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;font-family: " +
        tempConfig.font_family +
        "!important;'> Once the package is shipped, you would receive an email with the tracking details to track your order. <br> You can check the status of your order by logging into your account. <br> If you have any questions about your order, please contact us at <a style='color:#000;font-weight:600;' href='mailto:" +
        contactEmail +
        "'>" +
        contactEmail +
        "</a>";
      if (mailConfig.contact_no) {
        html +=
          " or call us at <a style='color:#000;font-weight:600;' href='tel:" +
          mailConfig.contact_no +
          "'>" +
          mailConfig.contact_no +
          "</a>";
      }
      html += "</p></div>";
      // footer
      html += createGeneralFooter(storeDetails);
      resolve(html);
    }
  });
};

exports.order_confirmed = function (storeDetails) {
  return new Promise((resolve, reject) => {
    let contactEmail = storeDetails.email;
    let mailConfig = storeDetails.mail_config;
    if (mailConfig.transporter) {
      contactEmail = mailConfig.transporter.auth.user;
    }
    let tempConfig = mailConfig.template_config;
    if (storeDetails.type == "restaurant_based") {
      // header
      let html = createRestaurantHeader(storeDetails);
      // main content
      html +=
        "<div style='font-size:30px;padding-top:15px;padding-left: 25px;padding-bottom:30px; padding-right: 25px;line-height:100%;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'> <h1 style='font-size: 1rem;line-height: 2rem;' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1rem;margin-top: 20px;margin-bottom: 20px;'>Thank you for your order!</h1> <p style='color:rgba(0,0,0,0.64); font-size:0.875rem; font-weight:500;line-height: 1.75rem;margin-bottom: 32px;'>Your order ##order_number## was confirmed on ##order_date##.</p> <div style='font-size:1rem; width:100%; padding-top:16px;font-family: " +
        tempConfig.font_family +
        "!important;'> <table width='' border='0' style='min-width:80%;max-width:100%;font-family: " +
        tempConfig.font_family +
        "!important;'> <tr> <td align='center' style='width:48%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;color:#000;word-break: break-all;font-family: " +
        tempConfig.font_family +
        "!important;'>Billing Information</td> <td>&nbsp;</td> <td align='center' style='width:48%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;color:#000;word-break: break-all;font-family: " +
        tempConfig.font_family +
        "!important;'>Shipping Information</td> </tr> <tr> <td style='word-break: break-all;'> <p style='padding-left: 0px;color:rgba(0,0,0,0.64);font-size:0.75rem; font-weight:500;line-height: 2rem;font-family: " +
        tempConfig.font_family +
        "!important;'> ##billing_address## </p> </td> <td>&nbsp;</td> <td style='word-break: break-all;'> <p style='padding-left: 0px;color:rgba(0,0,0,0.64);font-size:0.75rem; font-weight:500;line-height: 2rem;font-family: " +
        tempConfig.font_family +
        "!important;'> ##shipping_address## </p> </td> </tr> </table> </div> <div style='##payment_style##; width:100%; padding-top:40px;font-family: " +
        tempConfig.font_family +
        "!important;'> <p style='max-width:720px;padding-bottom: 32px;font-size:0.875rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> Payment Method: ##payment_method## </p> </div> <div style='font-size:0.75rem;color:#000; width:100%; padding-top:10px;padding-bottom:64px;overflow-x:auto;font-family: " +
        tempConfig.font_family +
        "!important;'> <table width='100%' border='0' cellpadding='0' cellspacing='0'> <tr style='padding:1rem 1rem;font-size:0.75rem;'> <td style='width:55%;font-size:0.75rem;background-color: #f6f6f6;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Item</td> <td style='width:15%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>SKU</td> <td style='width:15%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Qty.</td> <td style='width:15%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> </tr> ##item_list## <tr> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>##sub_total##</td> </tr> <tr style='##gw_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Gift Wrapping</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##gw_amount##</td> </tr> <tr style='##pack_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Packaging Charges</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##pack_amount##</td> </tr> <tr> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Shipping and Handling</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##shipping_cost##</td> </tr> <tr style='##cod_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>COD Charges</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##cod_amount##</td> </tr> <tr style='##discount_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Discount</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##discount_amount##</td> </tr> <tr> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Grand Total</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##grand_total##</td> </tr> </table> </div> <p style='max-width:720px;padding-top: 0px;padding-bottom: 36px;font-size: 0.875rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> Once the package is shipped, you would receive an email with the tracking details to track your order. <br> You can check the status of your order by logging into your account. <br> If you have any questions about your order, please contact us at <a style='color:#000;font-weight:600;' href='mailto:" +
        contactEmail +
        "'>" +
        contactEmail +
        "</a>";
      if (mailConfig.contact_no) {
        html +=
          " or call us at <a style='color:#000;font-weight:600;' href='tel:" +
          mailConfig.contact_no +
          "'>" +
          mailConfig.contact_no +
          "</a>";
      }
      html += "</p></div>";
      // footer
      html += createRestaurantFooter(storeDetails);
      resolve(html);
    } else {
      // header
      let html = createGeneralHeader(storeDetails);
      // main content
      html +=
        "<div style='font-size:30px;padding-top:15px;padding-left: 25px;padding-bottom:30px; padding-right: 25px;line-height:100%;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'> <h1 style='font-size: 1.25rem;line-height: 2rem;' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1.25rem;margin-top: 32px;margin-bottom: 32px;'>Thank you for your order!</h1> <p style='color:rgba(0,0,0,0.64); font-size:1rem; font-weight:500;line-height: 1.75rem;margin-bottom: 32px;'>Your order ##order_number## was confirmed on ##order_date##.</p> <div style='font-size:1rem; width:100%; padding-top:16px;font-family: " +
        tempConfig.font_family +
        "!important;'> <table width='' border='0' style='min-width:80%;max-width:100%;font-family: " +
        tempConfig.font_family +
        "!important;'> <tr> <td align='center' style='width:48%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;color:#000;word-break: break-all;font-family: " +
        tempConfig.font_family +
        "!important;'>Billing Information</td> <td>&nbsp;</td> <td align='center' style='width:48%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;color:#000;word-break: break-all;font-family: " +
        tempConfig.font_family +
        "!important;'>Shipping Information</td> </tr> <tr> <td style='word-break: break-all;'> <p style='padding-left: 0px;color:rgba(0,0,0,0.64);font-size:15px; font-weight:500;line-height: 2rem;font-family: " +
        tempConfig.font_family +
        "!important;'> ##billing_address## </p> </td> <td>&nbsp;</td> <td style='word-break: break-all;'> <p style='padding-left: 0px;color:rgba(0,0,0,0.64);font-size:15px; font-weight:500;line-height: 2rem;font-family: " +
        tempConfig.font_family +
        "!important;'> ##shipping_address## </p> </td> </tr> </table> </div> <div style='##payment_style##; width:100%; padding-top:40px;font-family: " +
        tempConfig.font_family +
        "!important;'> <p style='max-width:720px;padding-bottom: 32px;font-size: 1rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> Payment Method: ##payment_method## </p> </div> <div style='font-size:1rem;color:#000; width:100%; padding-top:10px;padding-bottom:64px;overflow-x:auto;font-family: " +
        tempConfig.font_family +
        "!important;'> <table width='100%' border='0' cellpadding='0' cellspacing='0'> <tr style='padding:1rem 2.5rem;font-size:1rem;'> <td style='width:40%;font-size:1rem;background-color: #f6f6f6;padding-left:20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Item</td> <td style='width:20%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>SKU</td> <td style='width:15%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Qty.</td> <td style='width:25%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> </tr> ##item_list## <tr> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>##sub_total##</td> </tr> <tr style='##gw_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Gift Wrapping</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##gw_amount##</td> </tr> <tr style='##pack_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Packaging Charges</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##pack_amount##</td> </tr> <tr> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Shipping and Handling</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##shipping_cost##</td> </tr> <tr style='##cod_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>COD Charges</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##cod_amount##</td> </tr> <tr style='##discount_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Discount</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>-##discount_amount##</td> </tr> <tr> <td>&nbsp;</td> <td style='color:#000;font-size:1.25rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Grand Total</td> <td>&nbsp;</td> <td style='color:#000;font-size:1.25rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##grand_total##</td> </tr> </table> </div> <p style='max-width:720px;padding-top: 0px;padding-bottom: 36px;font-size: 1rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> Once the package is shipped, you would receive an email with the tracking details to track your order. <br> You can check the status of your order by logging into your account. <br> If you have any questions about your order, please contact us at <a style='color:#000;font-weight:600;' href='mailto:" +
        contactEmail +
        "'>" +
        contactEmail +
        "</a>";
      if (mailConfig.contact_no) {
        html +=
          " or call us at <a style='color:#000;font-weight:600;' href='tel:" +
          mailConfig.contact_no +
          "'>" +
          mailConfig.contact_no +
          "</a>";
      }
      html += "</p></div>";
      // footer
      html += createGeneralFooter(storeDetails);
      resolve(html);
    }
  });
};

exports.order_dispatched = function (storeDetails) {
  return new Promise((resolve, reject) => {
    let contactEmail = storeDetails.email;
    let mailConfig = storeDetails.mail_config;
    if (mailConfig.transporter) {
      contactEmail = mailConfig.transporter.auth.user;
    }
    let tempConfig = mailConfig.template_config;
    if (storeDetails.type == "restaurant_based") {
      // header
      let html = createRestaurantHeader(storeDetails);
      // main content
      html +=
        "<div style='font-size:30px;padding-top:15px;padding-left: 25px;padding-bottom:30px; padding-right: 25px;line-height:100%;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'> <h1 style='font-size: 1rem;line-height: 2rem;' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1rem;margin-top:20px;margin-bottom: 20px;'>Thank you for your order!</h1> <p style='color:rgba(0,0,0,0.64); font-size:0.875rem; font-weight:500;line-height: 1.75rem;margin-bottom: 32px;'> Your order with order ID ##order_number## has been dispatched.</p> <div style='font-size:0.75rem; width:100%; padding-top:16px;font-family: " +
        tempConfig.font_family +
        "!important;'> <table border='0' style='min-width:80%;max-width:100%;font-family: " +
        tempConfig.font_family +
        "!important;'> <tr> <td align='center' style='width:48%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;color:#000;word-break: break-all;font-family: " +
        tempConfig.font_family +
        "!important;'>Billing Information</td> <td>&nbsp;</td> <td align='center' style='width:48%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;color:#000;word-break: break-all;font-family: " +
        tempConfig.font_family +
        "!important;'>Shipping Information</td> </tr> <tr> <td style='word-break: break-all;'> <p style='padding-left: 0px;color:rgba(0,0,0,0.64);font-size:0.75rem; font-weight:500;line-height: 2rem;font-family: " +
        tempConfig.font_family +
        "!important;'> ##billing_address## </p> </td> <td>&nbsp;</td> <td style='word-break: break-all;'> <p style='padding-left: 0px;color:rgba(0,0,0,0.64);font-size:0.75rem; font-weight:500;line-height: 2rem;font-family: " +
        tempConfig.font_family +
        "!important;'> ##shipping_address## </p> </td> </tr> </table> </div> <div style='font-size:0.75rem; width:100%; padding-top:16px; ##tracking_style##'> <table border='0' style='min-width:80%;max-width:100%;'> <tr> <td align='center' style='width:48%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;color:#000;word-break: break-all;font-family: " +
        tempConfig.font_family +
        "!important;'>Shipped by</td> <td>&nbsp;</td> <td align='center' style='width:48%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;color:#000;word-break: break-all;font-family: " +
        tempConfig.font_family +
        "!important;'>Tracking Number</td> </tr> <tr> <td style='word-break: break-all;'> <p style='padding-left: 0px;color:rgba(0,0,0,0.64);font-size:0.75rem; font-weight:500;line-height: 2rem;font-family: " +
        tempConfig.font_family +
        "!important;'> ##carrier_name## </p> </td> <td>&nbsp;</td> <td style='word-break: break-all;'> <a href='##tracking_link##' style='text-decoration: none;padding-left: 0px;color:rgba(0,0,0,0.64);font-size:0.75rem; font-weight:500;line-height: 2rem;font-family: " +
        tempConfig.font_family +
        "!important;'> ##tracking_number## </a> </td> </tr> </table> </div> <div style='##payment_style##; width:100%; padding-top:40px;font-family: " +
        tempConfig.font_family +
        "!important;'> <p style='max-width:720px;padding-bottom: 32px;font-size: 0.875rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> Payment Method: ##payment_method## </p> </div> <div style='font-size:0.75rem;color:#000; width:100%; padding-top:10px;padding-bottom:64px;overflow-x:auto;font-family: " +
        tempConfig.font_family +
        "!important;'> <table width='100%' border='0' cellpadding='0' cellspacing='0'> <tr style='padding:1rem 1rem;font-size:0.75rem;'> <td style='width:55%;font-size:0.75rem;background-color: #f6f6f6;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Item</td> <td style='width:15%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>SKU</td> <td style='width:15%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Qty.</td> <td style='width:15%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> </tr> ##item_list## <tr> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>##sub_total##</td> </tr> <tr style='##gw_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Gift Wrapping</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##gw_amount##</td> </tr> <tr style='##pack_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Packaging Charges</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##pack_amount##</td> </tr> <tr> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Shipping and Handling</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##shipping_cost##</td> </tr> <tr style='##cod_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>COD Charges</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##cod_amount##</td> </tr> <tr style='##discount_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Discount</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##discount_amount##</td> </tr> <tr> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Grand Total</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##grand_total##</td> </tr> </table> </div> <p style='max-width:720px;padding-top: 0px;padding-bottom: 36px;font-size:0.875rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> If you have any questions about your order, please contact us at <a style='color:#000;font-weight:600;' href='mailto:" +
        contactEmail +
        "'>" +
        contactEmail +
        "</a>";
      if (mailConfig.contact_no) {
        html +=
          " or call us at <a style='color:#000;font-weight:600;' href='tel:" +
          mailConfig.contact_no +
          "'>" +
          mailConfig.contact_no +
          "</a>";
      }
      html += "</p></div>";
      // footer
      html += createRestaurantFooter(storeDetails);
      resolve(html);
    } else {
      // header
      let html = createGeneralHeader(storeDetails);
      // main content
      html +=
        "<div style='font-size:30px;padding-top:15px;padding-left: 25px;padding-bottom:30px; padding-right: 25px;line-height:100%;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'> <h1 style='font-size: 1.25rem;line-height: 2rem;' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1.25rem;margin-top: 32px;margin-bottom: 32px;'>Thank you for your order!</h1> <p style='color:rgba(0,0,0,0.64); font-size:1rem; font-weight:500;line-height: 1.75rem;margin-bottom: 32px;'> Your shipment with order ID ##order_number## has been dispatched.</p> <div style='font-size:1rem; width:100%; padding-top:16px;font-family: " +
        tempConfig.font_family +
        "!important;'> <table border='0' style='min-width:80%;max-width:100%;font-family: " +
        tempConfig.font_family +
        "!important;'> <tr> <td align='center' style='width:48%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;color:#000;word-break: break-all;font-family: " +
        tempConfig.font_family +
        "!important;'>Billing Information</td> <td>&nbsp;</td> <td align='center' style='width:48%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;color:#000;word-break: break-all;font-family: " +
        tempConfig.font_family +
        "!important;'>Shipping Information</td> </tr> <tr> <td style='word-break: break-all;'> <p style='padding-left: 0px;color:rgba(0,0,0,0.64);font-size:15px; font-weight:500;line-height: 2rem;font-family: " +
        tempConfig.font_family +
        "!important;'> ##billing_address## </p> </td> <td>&nbsp;</td> <td style='word-break: break-all;'> <p style='padding-left: 0px;color:rgba(0,0,0,0.64);font-size:15px; font-weight:500;line-height: 2rem;font-family: " +
        tempConfig.font_family +
        "!important;'> ##shipping_address## </p> </td> </tr> </table> </div> <div style='font-size:1rem; width:100%; padding-top:16px; ##tracking_style##'> <table border='0' style='min-width:80%;max-width:100%;'> <tr> <td align='center' style='width:48%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;color:#000;word-break: break-all;font-family: " +
        tempConfig.font_family +
        "!important;'>Shipped by</td> <td>&nbsp;</td> <td align='center' style='width:48%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;color:#000;word-break: break-all;font-family: " +
        tempConfig.font_family +
        "!important;'>Tracking Number</td> </tr> <tr> <td style='word-break: break-all;'> <p style='padding-left: 0px;color:rgba(0,0,0,0.64);font-size:15px; font-weight:500;line-height: 2rem;font-family: " +
        tempConfig.font_family +
        "!important;'> ##carrier_name## </p> </td> <td>&nbsp;</td> <td style='word-break: break-all;'> <a href='##tracking_link##' style='text-decoration: none;padding-left: 0px;color:rgba(0,0,0,0.64);font-size:15px; font-weight:500;line-height: 2rem;font-family: " +
        tempConfig.font_family +
        "!important;'> ##tracking_number## </a> </td> </tr> </table> </div> <div style='##payment_style##; width:100%; padding-top:40px;font-family: " +
        tempConfig.font_family +
        "!important;'> <p style='max-width:720px;padding-bottom: 32px;font-size: 1rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> Payment Method: ##payment_method## </p> </div> <div style='font-size:1rem;color:#000; width:100%; padding-top:10px;padding-bottom:64px;overflow-x:auto;font-family: " +
        tempConfig.font_family +
        "!important;'> <table width='100%' border='0' cellpadding='0' cellspacing='0'> <tr style='padding:1rem 2.5rem;font-size:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'> <td style='width:40%;font-size:1rem;background-color: #f6f6f6;padding-left:20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Item</td> <td style='width:20%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>SKU</td> <td style='width:15%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Qty.</td> <td style='width:25%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> </tr>##item_list## <tbody style='##tbody_style##'> <tr> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>##sub_total##</td> </tr> <tr style='##gw_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Gift Wrapping</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##gw_amount##</td> </tr> <tr style='##pack_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Packaging Charges</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##pack_amount##</td> </tr> <tr> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Shipping and Handling</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##shipping_cost##</td> </tr> <tr style='##cod_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>COD Charges</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##cod_amount##</td> </tr> <tr style='##discount_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Discount</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>-##discount_amount##</td> </tr> <tr> <td>&nbsp;</td> <td style='color:#000;font-size:1.25rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Grand Total</td> <td>&nbsp;</td> <td style='color:#000;font-size:1.25rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##grand_total##</td> </tr> </tbody> </table> </div> <p style='max-width:720px;padding-top: 0px;padding-bottom: 36px;font-size: 1rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> If you have any questions about your order, please contact us at <a style='color:#000;font-weight:600;' href='mailto:" +
        contactEmail +
        "'>" +
        contactEmail +
        "</a>";
      if (mailConfig.contact_no) {
        html +=
          " or call us at <a style='color:#000;font-weight:600;' href='tel:" +
          mailConfig.contact_no +
          "'>" +
          mailConfig.contact_no +
          "</a>";
      }
      html += "</p></div>";
      // footer
      html += createGeneralFooter(storeDetails);
      resolve(html);
    }
  });
};

exports.order_delivered = function (storeDetails) {
  return new Promise((resolve, reject) => {
    let contactEmail = storeDetails.email;
    let mailConfig = storeDetails.mail_config;
    if (mailConfig.transporter) {
      contactEmail = mailConfig.transporter.auth.user;
    }
    let tempConfig = mailConfig.template_config;
    if (storeDetails.type == "restaurant_based") {
      // header
      let html = createRestaurantHeader(storeDetails);
      // main content
      html +=
        "<div style='font-size:30px;padding-top:15px;padding-left: 25px;padding-bottom:30px; padding-right: 25px;line-height:100%;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'> <h1 style='font-size: 1rem;line-height: 2rem;' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1rem;margin-top: 20px;margin-bottom: 20px;'>Thank you for ordering with us!</h1> <p style='color:rgba(0,0,0,0.64); font-size:0.875rem; font-weight:500;line-height: 1.75rem;margin-bottom: 32px;'>Your order with Order ID ##order_number## has been delivered to the below address:</p> <div style='font-size:0.875rem; width:100%; padding-top:16px;font-family: " +
        tempConfig.font_family +
        "!important;'> <table border='0' style='min-width:80%;max-width:100%;font-family: " +
        tempConfig.font_family +
        "!important;'> <tr> <td align='center' style='width:48%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;color:#000;word-break: break-all;font-family: " +
        tempConfig.font_family +
        "!important;'>Billing Information</td> <td>&nbsp;</td> <td align='center' style='width:48%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;color:#000;word-break: break-all;font-family: " +
        tempConfig.font_family +
        "!important;'>Shipping Information</td> </tr> <tr> <td style='word-break: break-all;'> <p style='padding-left: 0px;color:rgba(0,0,0,0.64);font-size:0.75rem; font-weight:500;line-height: 2rem;font-family: " +
        tempConfig.font_family +
        "!important;'> ##billing_address## </p> </td> <td>&nbsp;</td> <td style='word-break: break-all;'> <p style='padding-left: 0px;color:rgba(0,0,0,0.64);font-size:0.75rem; font-weight:500;line-height: 2rem;font-family: " +
        tempConfig.font_family +
        "!important;'> ##shipping_address## </p> </td> </tr> </table> </div> <div style='font-size:1rem; width:100%; padding-top:16px; ##tracking_style##'> <table border='0' style='min-width:80%;max-width:100%;'> <tr> <td align='center' style='width:48%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;color:#000;word-break: break-all;font-family: " +
        tempConfig.font_family +
        "!important;'>Shipped by</td> <td>&nbsp;</td> <td align='center' style='width:48%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;color:#000;word-break: break-all;font-family: " +
        tempConfig.font_family +
        "!important;'>Tracking Number</td> </tr> <tr> <td style='word-break: break-all;'> <p style='padding-left: 0px;color:rgba(0,0,0,0.64);font-size:0.75rem; font-weight:500;line-height: 2rem;font-family: " +
        tempConfig.font_family +
        "!important;'> ##carrier_name## </p> </td> <td>&nbsp;</td> <td style='word-break: break-all;'> <a href='##tracking_link##' style='text-decoration: none;padding-left: 0px;color:rgba(0,0,0,0.64);font-size:0.75rem; font-weight:500;line-height: 2rem;font-family: " +
        tempConfig.font_family +
        "!important;'> ##tracking_number## </a> </td> </tr> </table> </div> <div style='##payment_style##; width:100%; padding-top:40px;font-family: " +
        tempConfig.font_family +
        "!important;'> <p style='max-width:720px;padding-bottom: 32px;font-size: 0.875rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> Payment Method: ##payment_method## </p> </div> <div style='font-size:0.75rem;color:#000; width:100%; padding-top:10px;padding-bottom:64px;overflow-x:auto;font-family: " +
        tempConfig.font_family +
        "!important;'> <table width='100%' border='0' cellpadding='0' cellspacing='0'> <tr style='padding:1rem 1rem;font-size:0.75rem;'> <td style='width:55%;font-size:0.75rem;background-color: #f6f6f6;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Item</td> <td style='width:15%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>SKU</td> <td style='width:15%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Qty.</td> <td style='width:15%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> </tr> ##item_list## <tr> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>##sub_total##</td> </tr> <tr style='##gw_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Gift Wrapping</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##gw_amount##</td> </tr> <tr style='##pack_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Packaging Charges</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##pack_amount##</td> </tr> <tr> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Shipping and Handling</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##shipping_cost##</td> </tr> <tr style='##cod_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>COD Charges</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##cod_amount##</td> </tr> <tr style='##discount_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Discount</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##discount_amount##</td> </tr> <tr> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Grand Total</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##grand_total##</td> </tr> </table> </div> <p style='max-width:720px;padding-top: 0px;padding-bottom: 36px;font-size: 0.875rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> If you have any questions about your order, please contact us at <a style='color:#000;font-weight:600;' href='mailto:" +
        contactEmail +
        "'>" +
        contactEmail +
        "</a>";
      if (mailConfig.contact_no) {
        html +=
          " or call us at <a style='color:#000;font-weight:600;' href='tel:" +
          mailConfig.contact_no +
          "'>" +
          mailConfig.contact_no +
          "</a>";
      }
      html += "</p></div>";
      // footer
      html += createRestaurantFooter(storeDetails);
      resolve(html);
    } else {
      // header
      let html = createGeneralHeader(storeDetails);
      // main content
      html +=
        "<div style='font-size:30px;padding-top:15px;padding-left: 25px;padding-bottom:30px; padding-right: 25px;line-height:100%;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'> <h1 style='font-size: 1.25rem;line-height: 2rem;' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1.25rem;margin-top: 32px;margin-bottom: 32px;'>Thank you for shopping with us!</h1> <p style='color:rgba(0,0,0,0.64); font-size:1rem; font-weight:500;line-height: 1.75rem;margin-bottom: 32px;'>Your shipment with Order ID ##order_number## has been delivered to the below address:</p> <div style='font-size:1rem; width:100%; padding-top:16px;font-family: " +
        tempConfig.font_family +
        "!important;'> <table border='0' style='min-width:80%;max-width:100%;font-family: " +
        tempConfig.font_family +
        "!important;'> <tr> <td align='center' style='width:48%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;color:#000;word-break: break-all;font-family: " +
        tempConfig.font_family +
        "!important;'>Billing Information</td> <td>&nbsp;</td> <td align='center' style='width:48%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;color:#000;word-break: break-all;font-family: " +
        tempConfig.font_family +
        "!important;'>Shipping Information</td> </tr> <tr> <td style='word-break: break-all;'> <p style='padding-left: 0px;color:rgba(0,0,0,0.64);font-size:15px; font-weight:500;line-height: 2rem;font-family: " +
        tempConfig.font_family +
        "!important;'> ##billing_address## </p> </td> <td>&nbsp;</td> <td style='word-break: break-all;'> <p style='padding-left: 0px;color:rgba(0,0,0,0.64);font-size:15px; font-weight:500;line-height: 2rem;font-family: " +
        tempConfig.font_family +
        "!important;'> ##shipping_address## </p> </td> </tr> </table> </div> <div style='font-size:1rem; width:100%; padding-top:16px; ##tracking_style##'> <table border='0' style='min-width:80%;max-width:100%;'> <tr> <td align='center' style='width:48%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;color:#000;word-break: break-all;font-family: " +
        tempConfig.font_family +
        "!important;'>Shipped by</td> <td>&nbsp;</td> <td align='center' style='width:48%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;color:#000;word-break: break-all;font-family: " +
        tempConfig.font_family +
        "!important;'>Tracking Number</td> </tr> <tr> <td style='word-break: break-all;'> <p style='padding-left: 0px;color:rgba(0,0,0,0.64);font-size:15px; font-weight:500;line-height: 2rem;font-family: " +
        tempConfig.font_family +
        "!important;'> ##carrier_name## </p> </td> <td>&nbsp;</td> <td style='word-break: break-all;'> <a href='##tracking_link##' style='text-decoration: none;padding-left: 0px;color:rgba(0,0,0,0.64);font-size:15px; font-weight:500;line-height: 2rem;font-family: " +
        tempConfig.font_family +
        "!important;'> ##tracking_number## </a> </td> </tr> </table> </div> <div style='##payment_style##; width:100%; padding-top:40px;font-family: " +
        tempConfig.font_family +
        "!important;'> <p style='max-width:720px;padding-bottom: 32px;font-size: 1rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> Payment Method: ##payment_method## </p> </div> <div style='font-size:1rem;color:#000; width:100%; padding-top:10px;padding-bottom:64px;overflow-x:auto;font-family: " +
        tempConfig.font_family +
        "!important;'> <table width='100%' border='0' cellpadding='0' cellspacing='0'> <tr style='padding:1rem 2.5rem;font-size:1rem;'> <td style='width:40%;font-size:1rem;background-color: #f6f6f6;padding-left:20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Item</td> <td style='width:20%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>SKU</td> <td style='width:15%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Qty.</td> <td style='width:25%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> </tr>##item_list## <tr> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>##sub_total##</td> </tr> <tr style='##gw_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Gift Wrapping</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##gw_amount##</td> </tr> <tr style='##pack_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Packaging Charges</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##pack_amount##</td> </tr> <tr> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Shipping and Handling</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##shipping_cost##</td> </tr> <tr style='##cod_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>COD Charges</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##cod_amount##</td> </tr> <tr style='##discount_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Discount</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>-##discount_amount##</td> </tr> <tr> <td>&nbsp;</td> <td style='color:#000;font-size:1.25rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Grand Total</td> <td>&nbsp;</td> <td style='color:#000;font-size:1.25rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##grand_total##</td> </tr> </table> </div> <p style='max-width:720px;padding-top: 0px;padding-bottom: 36px;font-size: 1rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> If you have any questions about your order, please contact us at <a style='color:#000;font-weight:600;' href='mailto:" +
        contactEmail +
        "'>" +
        contactEmail +
        "</a>";
      if (mailConfig.contact_no) {
        html +=
          " or call us at <a style='color:#000;font-weight:600;' href='tel:" +
          mailConfig.contact_no +
          "'>" +
          mailConfig.contact_no +
          "</a>";
      }
      html += "</p></div>";
      // footer
      html += createGeneralFooter(storeDetails);
      resolve(html);
    }
  });
};

exports.pickup_order_placed = function (storeDetails) {
  return new Promise((resolve, reject) => {
    let contactEmail = storeDetails.email;
    let mailConfig = storeDetails.mail_config;
    if (mailConfig.transporter) {
      contactEmail = mailConfig.transporter.auth.user;
    }
    let tempConfig = mailConfig.template_config;
    if (storeDetails.type == "restaurant_based") {
      // header
      let html = createRestaurantHeader(storeDetails);
      // main content
      html +=
        "<div style='font-size:30px;padding-top:15px;padding-left: 25px;padding-bottom:30px; padding-right: 25px;line-height:100%;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'> <h1 style='font-size: 1rem;line-height: 2rem;font-weight: 600;' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1rem;margin-top: 20px;margin-bottom: 20px;font-weight: 600;'>Thank you for your order!</h1> <p style='color:rgba(0,0,0,0.64); font-size:0.875rem; font-weight:500;line-height: 1.75rem;margin-bottom: 32px;'>We have received your order with order ID ##order_number## and we are processing the same.</p> <div style='##payment_style##; width:100%; padding-top:15px;font-family: " +
        tempConfig.font_family +
        "!important;'> <p style='max-width:720px;padding-bottom: 25px;font-size: 0.875rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> Payment Method: ##payment_method## </p> </div> <div style='font-size:0.75rem;color:#000; width:100%; padding-top:10px;padding-bottom:64px;overflow-x:auto;font-family: " +
        tempConfig.font_family +
        "!important;'> <table width='100%' border='0' cellpadding='0' cellspacing='0'> <tr style='padding:1rem;font-size:0.75rem'> <td style='width:55%;font-size:0.75rem;background-color: #f6f6f6;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Item</td> <td style='width:15%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>SKU</td> <td style='width:15%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Qty.</td> <td style='width:15%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> </tr> ##item_list## <tr> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>##sub_total##</td> </tr> <tr style='##gw_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Gift Wrapping</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##gw_amount##</td> </tr> <tr style='##pack_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Packaging Charges</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##pack_amount##</td> </tr> <tr style='##cod_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>COD Charges</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##cod_amount##</td> </tr> <tr style='##discount_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Discount</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##discount_amount##</td> </tr> <tr> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Grand Total</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##grand_total##</td> </tr> </table> </div> <p style='max-width:720px;padding-top: 0px;padding-bottom: 36px;font-size: 0.875rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;font-family: " +
        tempConfig.font_family +
        "!important;'> If you have any questions about your order, please contact us at <a style='color:#000;font-weight:600;' href='mailto:" +
        contactEmail +
        "'>" +
        contactEmail +
        "</a>";
      if (mailConfig.contact_no) {
        html +=
          " or call us at <a style='color:#000;font-weight:600;' href='tel:" +
          mailConfig.contact_no +
          "'>" +
          mailConfig.contact_no +
          "</a>";
      }
      html += "</p></div>";
      // footer
      html += createRestaurantFooter(storeDetails);
      resolve(html);
    } else {
      // header
      let html = createGeneralHeader(storeDetails);
      // main content
      html +=
        "<div style='font-size:30px;padding-top:15px;padding-left: 25px;padding-bottom:30px; padding-right: 25px;line-height:100%;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'> <h1 style='font-size: 1.25rem;line-height: 2rem;font-weight: 600;' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1.25rem;margin-top: 32px;margin-bottom: 32px;font-weight: 600;'>Thank you for your order!</h1> <p style='color:rgba(0,0,0,0.64); font-size:1rem; font-weight:500;line-height: 1.75rem;margin-bottom: 32px;'>We have received your order with order ID ##order_number## and we are processing the same.</p> <div style='##payment_style##; width:100%; padding-top:15px;font-family: " +
        tempConfig.font_family +
        "!important;'> <p style='max-width:720px;padding-bottom: 25px;font-size: 1rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> Payment Method: ##payment_method## </p> </div> <div style='font-size:1rem;color:#000; width:100%; padding-top:10px;padding-bottom:64px;overflow-x:auto;font-family: " +
        tempConfig.font_family +
        "!important;'> <table width='100%' border='0' cellpadding='0' cellspacing='0'> <tr style='padding:1rem 2.5rem;font-size:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'> <td style='width:40%;font-size:1rem;background-color: #f6f6f6;padding-left:20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Item</td> <td style='width:20%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>SKU</td> <td style='width:15%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Qty.</td> <td style='width:25%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> </tr> ##item_list## <tr> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>##sub_total##</td> </tr> <tr style='##gw_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Gift Wrapping</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##gw_amount##</td> </tr> <tr style='##pack_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Packaging Charges</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##pack_amount##</td> </tr> <tr style='##cod_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>COD Charges</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##cod_amount##</td> </tr> <tr style='##discount_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Discount</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>-##discount_amount##</td> </tr> <tr> <td>&nbsp;</td> <td style='color:#000;font-size:1.25rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Grand Total</td> <td>&nbsp;</td> <td style='color:#000;font-size:1.25rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##grand_total##</td> </tr> </table> </div> <p style='max-width:720px;padding-top: 0px;padding-bottom: 36px;font-size: 1rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;font-family: " +
        tempConfig.font_family +
        "!important;'> If you have any questions about your order, please contact us at <a style='color:#000;font-weight:600;' href='mailto:" +
        contactEmail +
        "'>" +
        contactEmail +
        "</a>";
      if (mailConfig.contact_no) {
        html +=
          " or call us at <a style='color:#000;font-weight:600;' href='tel:" +
          mailConfig.contact_no +
          "'>" +
          mailConfig.contact_no +
          "</a>";
      }
      html += "</p></div>";
      // footer
      html += createGeneralFooter(storeDetails);
      resolve(html);
    }
  });
};

exports.pickup_order_confirmed = function (storeDetails) {
  return new Promise((resolve, reject) => {
    let contactEmail = storeDetails.email;
    let mailConfig = storeDetails.mail_config;
    if (mailConfig.transporter) {
      contactEmail = mailConfig.transporter.auth.user;
    }
    let tempConfig = mailConfig.template_config;
    if (storeDetails.type == "restaurant_based") {
      // header
      let html = createRestaurantHeader(storeDetails);
      // main content
      html +=
        "<div style='font-size:30px;padding-top:15px;padding-left: 25px;padding-bottom:30px; padding-right: 25px;line-height:100%;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'> <h1 style='font-size: 1rem;line-height: 2rem;font-weight:600' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1rem;margin-top: 20px;margin-bottom: 20px;font-weight:600'>Thank you for your order!</h1> <p style='color:rgba(0,0,0,0.64); font-size:0.875rem; font-weight:500;line-height: 1.75rem;margin-bottom: 32px;'>Your order ##order_number## was confirmed on ##order_date##.</p> <p style='padding-top: 0px;font-size: 0.875rem;margin-top: 36px;margin-bottom: 8px;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'>Pickup Details</p> <table style='padding-top:0px;font-family: " +
        tempConfig.font_family +
        "!important;'> <tr> <td> <p style='margin:0;font-size: 0.875rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'>Pickup Date</p> </td> <td> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 0.875rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'>:</p> </td> <td> <p style='margin:0;padding-left:5px;font-size: 0.875rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'>##pickup_date##</p> </td> </tr> <tr> <td> <p style='padding-top:0px;margin:0;font-size: 0.875rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'>Pickup Time</p> </td> <td> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 0.875rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'>:</p> </td> <td> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 0.875rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'>##pickup_time##</p> </td> </tr> <tr> <td style='vertical-align: top;'> <p style='padding-top:0px;margin:0;font-size: 0.875rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'>Pickup Location</p> </td> <td style='vertical-align: top;'> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 0.875rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'>:</p> </td> <td> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 0.875rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'> ##pickup_loc_name##, <br>##pickup_loc_addr## <br> <a href='##pickup_loc_url##' target='_blank' style='text-decoration:underline;color: rgba(0,0,0,0.64);font-weight: 600;'>Get Directions</a> </p> </td> </tr> </table> <div style='font-size:1rem; width:100%; padding-top:16px;font-family: " +
        tempConfig.font_family +
        "!important;'> <div style='font-size:0.75rem;color:#000; width:100%; padding-top:10px;padding-bottom:64px;overflow-x:auto;font-family: " +
        tempConfig.font_family +
        "!important;'> <table width='100%' border='0' cellpadding='0' cellspacing='0'> <tr style='padding:1rem;font-size:0.75rem'> <td style='width:55%;font-size:0.75rem;background-color: #f6f6f6;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Item</td> <td style='width:15%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>SKU</td> <td style='width:15%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Qty.</td> <td style='width:15%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> </tr> ##item_list## <tr> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>##sub_total##</td> </tr> <tr style='##gw_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Gift Wrapping</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##gw_amount##</td> </tr> <tr style='##pack_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Packaging Charges</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##pack_amount##</td> </tr> <tr style='##cod_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>COD Charges</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##cod_amount##</td> </tr> <tr style='##discount_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Discount</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##discount_amount##</td> </tr> <tr> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Grand Total</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##grand_total##</td> </tr> </table> </div> <p style='max-width:720px;padding-top: 0px;padding-bottom: 36px;font-size: 0.875rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> If you have any questions about your order, please contact us at <a style='color:#000;font-weight:600;' href='mailto:" +
        contactEmail +
        "'>" +
        contactEmail +
        "</a>";
      if (mailConfig.contact_no) {
        html +=
          " or call us at <a style='color:#000;font-weight:600;' href='tel:" +
          mailConfig.contact_no +
          "'>" +
          mailConfig.contact_no +
          "</a>";
      }
      html += "</p></div>";
      // footer
      html += createRestaurantFooter(storeDetails);
      resolve(html);
    } else {
      // header
      let html = createGeneralHeader(storeDetails);
      // main content
      html +=
        "<div style='font-size:30px;padding-top:15px;padding-left: 25px;padding-bottom:30px; padding-right: 25px;line-height:100%;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'> <h1 style='font-size: 1.25rem;line-height: 2rem;font-weight:600' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1.25rem;margin-top: 32px;margin-bottom: 32px;font-weight:600'>Thank you for your order!</h1> <p style='color:rgba(0,0,0,0.64); font-size:1rem; font-weight:500;line-height: 1.75rem;margin-bottom: 32px;'>Your order ##order_number## was confirmed on ##order_date##.</p> <p style='padding-top: 0px;font-size: 1rem;margin-top: 36px;margin-bottom: 8px;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'>Pickup Details</p> <table style='padding-top:0px;font-family: " +
        tempConfig.font_family +
        "!important;'> <tr> <td> <p style='margin:0;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'>Pickup Date</p> </td> <td> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'>:</p> </td> <td> <p style='margin:0;padding-left:5px;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'>##pickup_date##</p> </td> </tr> <tr> <td> <p style='padding-top:0px;margin:0;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'>Pickup Time</p> </td> <td> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'>:</p> </td> <td> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'>##pickup_time##</p> </td> </tr> <tr> <td style='vertical-align: top;'> <p style='padding-top:0px;margin:0;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'>Pickup Location</p> </td> <td style='vertical-align: top;'> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'>:</p> </td> <td> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'> ##pickup_loc_name##,<br>##pickup_loc_addr##<br> <a href='##pickup_loc_url##' target='_blank' style='text-decoration:underline;color: rgba(0,0,0,0.64);font-weight: 600;'>Get Directions</a> </p> </td> </tr> </table> <div style='font-size:1rem; width:100%; padding-top:16px;font-family: " +
        tempConfig.font_family +
        "!important;'> <div style='font-size:1rem;color:#000; width:100%; padding-top:10px;padding-bottom:64px;overflow-x:auto;font-family: " +
        tempConfig.font_family +
        "!important;'> <table width='100%' border='0' cellpadding='0' cellspacing='0'> <tr style='padding:1rem 2.5rem;font-size:1rem;'> <td style='width:40%;font-size:1rem;background-color: #f6f6f6;padding-left:20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Item</td> <td style='width:20%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>SKU</td> <td style='width:15%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Qty.</td> <td style='width:25%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> </tr> ##item_list## <tr> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>##sub_total##</td> </tr> <tr style='##gw_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Gift Wrapping</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##gw_amount##</td> </tr> <tr style='##pack_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Packaging Charges</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##pack_amount##</td> </tr> <tr style='##cod_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>COD Charges</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##cod_amount##</td> </tr> <tr style='##discount_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Discount</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>-##discount_amount##</td> </tr> <tr> <td>&nbsp;</td> <td style='color:#000;font-size:1.25rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Grand Total</td> <td>&nbsp;</td> <td style='color:#000;font-size:1.25rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##grand_total##</td> </tr> </table> </div> <p style='max-width:720px;padding-top: 0px;padding-bottom: 36px;font-size: 1rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> If you have any questions about your order, please contact us at <a style='color:#000;font-weight:600;' href='mailto:" +
        contactEmail +
        "'>" +
        contactEmail +
        "</a>";
      if (mailConfig.contact_no) {
        html +=
          " or call us at <a style='color:#000;font-weight:600;' href='tel:" +
          mailConfig.contact_no +
          "'>" +
          mailConfig.contact_no +
          "</a>";
      }
      html += "</p></div></div>";
      // footer
      html += createGeneralFooter(storeDetails);
      resolve(html);
    }
  });
};

exports.pickup_order_dispatched = function (storeDetails) {
  return new Promise((resolve, reject) => {
    let contactEmail = storeDetails.email;
    let mailConfig = storeDetails.mail_config;
    if (mailConfig.transporter) {
      contactEmail = mailConfig.transporter.auth.user;
    }
    let tempConfig = mailConfig.template_config;
    if (storeDetails.type == "restaurant_based") {
      // header
      let html = createRestaurantHeader(storeDetails);
      // main content
      html +=
        "<div style='font-size:30px;padding-top:15px;padding-left: 25px;padding-bottom:30px; padding-right: 25px;line-height:100%;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'> <h1 style='font-size: 1rem;line-height: 2rem;font-weight: 600;' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1rem;margin-top: 20px;margin-bottom: 20px;font-weight:600'>Thank you for your order!</h1> <p style='color:rgba(0,0,0,0.64); font-size:0.875rem; font-weight:500;line-height: 1.75rem;margin-bottom: 32px;'> Your order with order ID ##order_number## is ready to be picked up.</p> <p style='padding-top: 0px;font-size: 0.875rem;margin-top: 36px;margin-bottom: 8px;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'>Pickup Details</p> <table style='padding-top:0px;font-family: " +
        tempConfig.font_family +
        "!important;'> <tr> <td style='vertical-align: top;'> <p style='padding-top:0px;margin:0;font-size: 0.875rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'>Pickup Location</p> </td> <td style='vertical-align: top;'> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 0.875rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'>:</p> </td> <td> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 0.875rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'> ##pickup_loc_name##, <br>##pickup_loc_addr## <br> <a href='##pickup_loc_url##' target='_blank' style='text-decoration:underline;color: rgba(0,0,0,0.64);font-weight: 600;font-size: 0.875rem;'>Get Directions</a> </p> </td> </tr> </table> <div style='font-size:0.75rem;color:#000; width:100%; padding-top:10px;padding-bottom:64px;overflow-x:auto;font-family: " +
        tempConfig.font_family +
        "!important;'> <table width='100%' border='0' cellpadding='0' cellspacing='0'> <tr style='padding:1rem;font-size:0.75rem'> <td style='width:55%;font-size:0.75rem;background-color: #f6f6f6;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Item</td> <td style='width:15%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>SKU</td> <td style='width:15%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Qty.</td> <td style='width:15%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> </tr> ##item_list## <tr> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>##sub_total##</td> </tr> <tr style='##gw_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Gift Wrapping</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##gw_amount##</td> </tr> <tr style='##pack_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Packaging Charges</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##pack_amount##</td> </tr> <tr style='##cod_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>COD Charges</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##cod_amount##</td> </tr> <tr style='##discount_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Discount</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##discount_amount##</td> </tr> <tr> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Grand Total</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##grand_total##</td> </tr> </table> </div> <p style='max-width:720px;padding-top: 0px;padding-bottom: 36px;font-size: 0.875rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> If you have any questions about your order, please contact us at <a style='color:#000;font-weight:600;' href='mailto:" +
        contactEmail +
        "'>" +
        contactEmail +
        "</a>";
      if (mailConfig.contact_no) {
        html +=
          " or call us at <a style='color:#000;font-weight:600;' href='tel:" +
          mailConfig.contact_no +
          "'>" +
          mailConfig.contact_no +
          "</a>";
      }
      html += "</p></div>";
      // footer
      html += createRestaurantFooter(storeDetails);
      resolve(html);
    } else {
      // header
      let html = createGeneralHeader(storeDetails);
      // main content
      html +=
        "<div style='font-size:30px;padding-top:15px;padding-left: 25px;padding-bottom:30px; padding-right: 25px;line-height:100%;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'> <h1 style='font-size: 1.25rem;line-height: 2rem;font-weight: 600;' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1.25rem;margin-top: 32px;margin-bottom: 32px;font-weight:600'>Thank you for your order!</h1> <p style='color:rgba(0,0,0,0.64); font-size:1rem; font-weight:500;line-height: 1.75rem;margin-bottom: 32px;'> Your order with order ID ##order_number## is ready to be picked up.</p> <p style='padding-top: 0px;font-size: 1rem;margin-top: 36px;margin-bottom: 8px;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'>Pickup Details</p> <table style='padding-top:0px;font-family: " +
        tempConfig.font_family +
        "!important;'> <tr> <td style='vertical-align: top;'> <p style='padding-top:0px;margin:0;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'>Pickup Location</p> </td> <td style='vertical-align: top;'> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'>:</p> </td> <td> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'> ##pickup_loc_name##,<br>##pickup_loc_addr##<br> <a href='##pickup_loc_url##' target='_blank' style='text-decoration:underline;color: rgba(0,0,0,0.64);font-weight: 600;'>Get Directions</a> </p> </td> </tr> </table> <div style='font-size:1rem;color:#000; width:100%; padding-top:10px;padding-bottom:64px;overflow-x:auto;font-family: " +
        tempConfig.font_family +
        "!important;'> <table width='100%' border='0' cellpadding='0' cellspacing='0'> <tr style='padding:1rem 2.5rem;font-size:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'> <td style='width:40%;font-size:1rem;background-color: #f6f6f6;padding-left:20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Item</td> <td style='width:20%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>SKU</td> <td style='width:15%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Qty.</td> <td style='width:25%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> </tr>##item_list## <tr> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>##sub_total##</td> </tr> <tr style='##gw_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Gift Wrapping</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##gw_amount##</td> </tr> <tr style='##pack_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Packaging Charges</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##pack_amount##</td> </tr> <tr style='##cod_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>COD Charges</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##cod_amount##</td> </tr> <tr style='##discount_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Discount</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>-##discount_amount##</td> </tr> <tr> <td>&nbsp;</td> <td style='color:#000;font-size:1.25rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Grand Total</td> <td>&nbsp;</td> <td style='color:#000;font-size:1.25rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##grand_total##</td> </tr> </table> </div> <p style='max-width:720px;padding-top: 0px;padding-bottom: 36px;font-size: 1rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> If you have any questions about your order, please contact us at <a style='color:#000;font-weight:600;' href='mailto:" +
        contactEmail +
        "'>" +
        contactEmail +
        "</a>";
      if (mailConfig.contact_no) {
        html +=
          " or call us at <a style='color:#000;font-weight:600;' href='tel:" +
          mailConfig.contact_no +
          "'>" +
          mailConfig.contact_no +
          "</a>";
      }
      html += "</p></div>";
      // footer
      html += createGeneralFooter(storeDetails);
      resolve(html);
    }
  });
};

exports.pickup_order_delivered = function (storeDetails) {
  return new Promise((resolve, reject) => {
    let contactEmail = storeDetails.email;
    let mailConfig = storeDetails.mail_config;
    if (mailConfig.transporter) {
      contactEmail = mailConfig.transporter.auth.user;
    }
    let tempConfig = mailConfig.template_config;
    if (storeDetails.type == "restaurant_based") {
      // header
      let html = createRestaurantHeader(storeDetails);
      // main content
      html +=
        "<div style='font-size:30px;padding-top:15px;padding-left: 25px;padding-bottom:30px; padding-right: 25px;line-height:100%;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'> <h1 style='font-size: 1rem;line-height: 2rem;font-weight:600' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1rem;margin-top: 20px;margin-bottom: 20px;font-weight:600'>Thank you for ordering with us!</h1> <p style='color:rgba(0,0,0,0.64); font-size:0.875rem; font-weight:500;line-height: 1.75rem;margin-bottom: 32px;'>This email is to confirm that your order with Order ID ##order_number## has been picked up at " +
        storeDetails.name +
        ".</p> <div style='font-size:0.75rem;color:#000; width:100%; padding-top:10px;padding-bottom:64px;overflow-x:auto;font-family: " +
        tempConfig.font_family +
        "!important;'> <table width='100%' border='0' cellpadding='0' cellspacing='0'> <tr style='padding:1rem;font-size:0.75rem'> <td style='width:55%;font-size:0.75rem;background-color: #f6f6f6;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Item</td> <td style='width:15%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>SKU</td> <td style='width:15%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Qty.</td> <td style='width:15%;padding:1rem;font-size:0.75rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> </tr> ##item_list## <tr> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>##sub_total##</td> </tr> <tr style='##gw_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Gift Wrapping</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##gw_amount##</td> </tr> <tr style='##pack_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Packaging Charges</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##pack_amount##</td> </tr> <tr style='##cod_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>COD Charges</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##cod_amount##</td> </tr> <tr style='##discount_style##'> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Discount</td> <td style='color:#000;font-size:0.75rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##discount_amount##</td> </tr> <tr> <td>&nbsp;</td> <td colspan='2' style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>Grand Total</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left:1rem;font-family: " +
        tempConfig.font_family +
        "!important;'>##grand_total##</td> </tr> </table> </div> <p style='max-width:720px;padding-top: 0px;padding-bottom: 36px;font-size: 0.875rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> If you have any questions about your order, please contact us at <a style='color:#000;font-weight:600;' href='mailto:" +
        contactEmail +
        "'>" +
        contactEmail +
        "</a>";
      if (mailConfig.contact_no) {
        html +=
          " or call us at <a style='color:#000;font-weight:600;' href='tel:" +
          mailConfig.contact_no +
          "'>" +
          mailConfig.contact_no +
          "</a>";
      }
      html += "</p></div>";
      // footer
      html += createRestaurantFooter(storeDetails);
      resolve(html);
    } else {
      // header
      let html = createGeneralHeader(storeDetails);
      // main content
      html +=
        "<div style='font-size:30px;padding-top:15px;padding-left: 25px;padding-bottom:30px; padding-right: 25px;line-height:100%;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'> <h1 style='font-size: 1.25rem;line-height: 2rem;font-weight:600' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1.25rem;margin-top: 32px;margin-bottom: 32px;font-weight:600'>Thank you for ordering with us!</h1> <p style='color:rgba(0,0,0,0.64); font-size:1rem; font-weight:500;line-height: 1.75rem;margin-bottom: 32px;'>This email is to confirm that your order with Order ID ##order_number## has been picked up at " +
        storeDetails.name +
        ".</p> <div style='font-size:1rem;color:#000; width:100%; padding-top:10px;padding-bottom:64px;overflow-x:auto;font-family: " +
        tempConfig.font_family +
        "!important;'> <table width='100%' border='0' cellpadding='0' cellspacing='0'> <tr style='padding:1rem 2.5rem;font-size:1rem;'> <td style='width:40%;font-size:1rem;background-color: #f6f6f6;padding-left:20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Item</td> <td style='width:20%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>SKU</td> <td style='width:15%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Qty.</td> <td style='width:25%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> </tr>##item_list## <tr> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>Subtotal</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;padding-top: 18px;font-family: " +
        tempConfig.font_family +
        "!important;'>##sub_total##</td> </tr> <tr style='##gw_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Gift Wrapping</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##gw_amount##</td> </tr> <tr style='##pack_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Packaging Charges</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##pack_amount##</td> </tr> <tr style='##cod_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>COD Charges</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##cod_amount##</td> </tr> <tr style='##discount_style##'> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Discount</td> <td>&nbsp;</td> <td style='color:#000;font-size:0.875rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>-##discount_amount##</td> </tr> <tr> <td>&nbsp;</td> <td style='color:#000;font-size:1.25rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>Grand Total</td> <td>&nbsp;</td> <td style='color:#000;font-size:1.25rem;font-weight:500;line-height:2rem;padding-left: 20px;font-family: " +
        tempConfig.font_family +
        "!important;'>##grand_total##</td> </tr> </table> </div> <p style='max-width:720px;padding-top: 0px;padding-bottom: 36px;font-size: 1rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> If you have any questions about your order, please contact us at <a style='color:#000;font-weight:600;' href='mailto:" +
        contactEmail +
        "'>" +
        contactEmail +
        "</a>";
      if (mailConfig.contact_no) {
        html +=
          " or call us at <a style='color:#000;font-weight:600;' href='tel:" +
          mailConfig.contact_no +
          "'>" +
          mailConfig.contact_no +
          "</a>";
      }
      html += "</p></div>";
      // footer
      html += createGeneralFooter(storeDetails);
      resolve(html);
    }
  });
};

exports.order_review = function (storeDetails) {
  return new Promise((resolve, reject) => {
    let mailConfig = storeDetails.mail_config;
    let tempConfig = mailConfig.template_config;
    if (storeDetails.type == "restaurant_based") {
      // header
      let html = createRestaurantHeader(storeDetails);
      // main content
      html +=
        "<div style='font-size:18px; padding-top:15px; padding-left:25px; padding-bottom:30px; padding-right:25px; line-height:100%;' align='left'> <h1 style='font-size:1rem; font-family:" +
        tempConfig.font_family +
        "!important;' align='left'>Hello ##customer_name##,</h1> <p style='color:rgba(0,0,0,0.64);font-size: 1rem;margin-top: 20px;margin-bottom: 20px;'>Thank you for ordering at " +
        storeDetails.website +
        "</p> <p style='color:rgba(0,0,0,0.64); font-size:0.875rem; font-weight:500; font-family:" +
        tempConfig.font_family +
        "!important; line-height:1.5rem;'>Please take a moment to leave a feedback, we'd love to hear your thoughts and so would our other customers. <br>Give us a review and share your experience.</p> <div style='color:#000; font-size:12px; padding:30px 20px; font-family:" +
        tempConfig.font_family +
        "!important;' align='center'> <a href='##review_link##' style='width:300px; font-weight:600; text-decoration:none; background-color:#000000;color:#fff!important; padding:20px 25px; line-height:20px; font-size:12px;' align='center'>REVIEW YOUR PURCHASE</a> </div> </div>";
      // footer
      html += createRestaurantFooter(storeDetails);
      resolve(html);
    } else {
      // header
      let html = createGeneralHeader(storeDetails);
      // main content
      html +=
        "<div style='font-size:18px; padding-top:15px; padding-left:25px; padding-bottom:30px; padding-right:25px; line-height:100%;' align='left'> <h1 style='font-size:20px; font-family:" +
        tempConfig.font_family +
        "!important;' align='left'>Hello ##customer_name##,</h1><p style='color:rgba(0,0,0,0.64); font-size:16px; font-weight:500; font-family:" +
        tempConfig.font_family +
        "!important;'>Thank you for shopping at " +
        storeDetails.website +
        "</p><p style='color:rgba(0,0,0,0.64); font-size:16px; font-weight:500; font-family:" +
        tempConfig.font_family +
        "!important; line-height:1.5rem;'>Please take a moment to leave a feedback, we'd love to hear your thoughts and so would our other customers.<br>Give us a review and share your experience.</p><div style='color:#000; font-size:13px; padding:20px; font-family:" +
        tempConfig.font_family +
        "!important;' align='center'><a href='##review_link##' style='width:300px; font-weight:600; text-decoration:none; background-color:" +
        tempConfig.theme_color +
        ";color:" +
        tempConfig.txt_color +
        "!important; padding:20px 25px; line-height:20px; font-size:14px;' align='center'>REVIEW YOUR PURCHASE</a></div></div>";
      // footer
      html += createGeneralFooter(storeDetails);
      resolve(html);
    }
  });
};

exports.order_cancelled = function (storeDetails) {
  return new Promise((resolve, reject) => {
    let contactEmail = storeDetails.email;
    let mailConfig = storeDetails.mail_config;
    if (mailConfig.transporter) {
      contactEmail = mailConfig.transporter.auth.user;
    }
    let tempConfig = mailConfig.template_config;
    if (storeDetails.type == "restaurant_based") {
      // header
      let html = createRestaurantHeader(storeDetails);
      // main content
      html +=
        "<div style='font-size:30px;padding-top:15px;padding-left: 25px; padding-right: 25px;line-height:100%;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'> <h1 style='font-size: 1rem;line-height: 2rem;' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1rem;margin-top: 20px;margin-bottom: 20px;'>Greetings from " +
        storeDetails.name +
        "!</h1> <p style='color: rgba(0,0,0,0.64);font-size:0.875rem; font-weight:500;line-height: 2rem;font-family: " +
        tempConfig.font_family +
        "!important;'> Your order ##order_number## has been cancelled.</p> <p style='padding-top: 0px;font-size: 0.875rem;margin-top: 36px;margin-bottom: 8px;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'>Order Details</p> <table style='padding-top:0px;font-family: " +
        tempConfig.font_family +
        "!important;'> <tr> <td> <p style='margin:0;font-size: 0.875rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'>Order ID</p> </td> <td> <p style='margin:0;padding-left:5px;font-size: 0.875rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'>: ##order_number##</p> </td> </tr> <tr> <td> <p style='padding-top:0px;margin:0;font-size: 0.875rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'>Order Date</p> </td> <td> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 0.875rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'>: ##order_date##</p> </td> </tr> </table> <p style='max-width:720px;padding-top: 42px;padding-bottom: 64px;font-size: 0.875rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> A member of our team will get in touch with you as soon as possible and make sure your refund process goes as smooth as possible. <br> If you have any questions about your order, please contact us at <a style='color:#000;font-weight:600;' href='mailto:" +
        contactEmail +
        "'>" +
        contactEmail +
        "</a>";
      if (mailConfig.contact_no) {
        html +=
          " or call us at <a style='color:#000;font-weight:600;' href='tel:" +
          mailConfig.contact_no +
          "'>" +
          mailConfig.contact_no +
          "</a>";
      }
      html += "</p></div>";
      // footer
      html += createRestaurantFooter(storeDetails);
      resolve(html);
    } else {
      // header
      let html = createGeneralHeader(storeDetails);
      // main content
      html +=
        "<div style='font-size:30px;padding-top:15px;padding-left: 25px; padding-right: 25px;line-height:100%;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'> <h1 style='font-size: 1.25rem;line-height: 2rem;' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1.25rem;margin-top: 32px;margin-bottom: 32px;'>Greetings from " +
        storeDetails.name +
        "!</h1> <p style='color: rgba(0,0,0,0.64);font-size:16px; font-weight:500;line-height: 2rem;font-family: " +
        tempConfig.font_family +
        "!important;'> Your order ##order_number## has been cancelled.</p> <p style='padding-top: 0px;font-size: 1rem;margin-top: 36px;margin-bottom: 8px;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'>Order Details</p> <table style='padding-top:0px;font-family: " +
        tempConfig.font_family +
        "!important;'> <tr> <td> <p style='margin:0;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'>Order ID</p> </td> <td> <p style='margin:0;padding-left:5px;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'>: ##order_number##</p> </td> </tr> <tr> <td> <p style='padding-top:0px;margin:0;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'>Order Date</p> </td> <td> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
        tempConfig.font_family +
        "!important;'>: ##order_date##</p> </td> </tr> </table> <p style='max-width:720px;padding-top: 42px;padding-bottom: 64px;font-size: 1rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> A member of our team will get in touch with you as soon as possible and make sure your refund process goes as smooth as possible. <br> If you have any questions about your order, please contact us at <a style='color:#000;font-weight:600;' href='mailto:" +
        contactEmail +
        "'>" +
        contactEmail +
        "</a>";
      if (mailConfig.contact_no) {
        html +=
          " or call us at <a style='color:#000;font-weight:600;' href='tel:" +
          mailConfig.contact_no +
          "'>" +
          mailConfig.contact_no +
          "</a>";
      }
      html += "</p></div>";
      // footer
      html += createGeneralFooter(storeDetails);
      resolve(html);
    }
  });
};

exports.giftcard_coupon = function (storeDetails) {
  return new Promise((resolve, reject) => {
    let addFeatures = storeDetails.additional_features;
    let giftImg =
      setupConfig.image_base + "yourstore/gift.png?v=" + new Date().valueOf();

    let contactEmail = storeDetails.email;
    let mailConfig = storeDetails.mail_config;
    if (mailConfig.transporter) {
      contactEmail = mailConfig.transporter.auth.user;
    }
    let tempConfig = mailConfig.template_config;
    // header
    let html = createGeneralHeader(storeDetails);
    // main content
    html +=
      "<div style='font-size:30px;padding-top:15px;padding-left: 25px; padding-right: 25px;line-height:100%;font-family: " +
      tempConfig.font_family +
      "!important;' align='left'> <h1 style='font-size: 1.25rem;line-height: 2rem;' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1.25rem;margin-top: 32px;margin-bottom: 32px;'>Greetings from " +
      storeDetails.name +
      "!</h1> <p style='color: rgba(0,0,0,0.64);font-size:16px; font-weight:500;line-height: 2rem;'> You have received a " +
      storeDetails.name +
      " Gift Card <br> worth ##coupon_price## from ##from_name## on ##current_date##.</p> <p style='padding-top: 0px;font-size: 1rem;margin-top: 36px;margin-bottom: 8px;' align='left'>Gift Card Details</p> <table style='padding-top:0px;font-family: " +
      tempConfig.font_family +
      "!important;'> <tr> <td> <p style='padding-top:0px;margin:0;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
      tempConfig.font_family +
      "!important;'>Sent by</p> </td> <td> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
      tempConfig.font_family +
      "!important;'>: ##from_name##</p> </td> </tr> <tr> <td> <p style='padding-top:0px;margin:0;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
      tempConfig.font_family +
      "!important;'>Message</p> </td> <td> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
      tempConfig.font_family +
      "!important;'>: ##message##</p> </td> </tr> </table> <p style='color:rgba(0,0,0,0.64); font-size:1rem;'>Use the following to make a purchase:</p> <div style='border-radius: 15px; display:flex;justify-content:center;padding:25px;font-size:1rem;background-color:" +
      tempConfig.theme_color +
      ";color:" +
      tempConfig.txt_color +
      "!important;'> <div style='width:80%; float:left;'> <p style='color:" +
      tempConfig.txt_color +
      "'>Gift Card Code: ##coupon_code##</p> <p style='color:" +
      tempConfig.txt_color +
      "'>Gift Card Value: ##coupon_price##</p> </div> <div style='width:20%;float:right;justify-content:flex-end;align-items:center;display:flex;' align='right'> <img src='" +
      giftImg +
      "' alt='Gift' style='width:74px;height:74px;'> </div> <div style='clear: both'>&nbsp;</div> </div> <p style='max-width:720px;padding-top: 48px;padding-bottom: 42px;font-size: 1rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'>They can start shopping now and apply their gift card code to their shopping bag during checkout on our online store at <a style='color:" +
      tempConfig.theme_color +
      ";font-weight:600' href='" +
      storeDetails.base_url +
      "'>" +
      storeDetails.website +
      "</a> </p> <p style='max-width:720px;padding-top: 0px;padding-bottom: 48px;font-size: 1rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> This code is valid for <a style='color:#000;font-weight:600'>" +
      addFeatures.gc_validity_in_month +
      " months</a> from the date of issuance. </p> <p style='max-width:720px;padding-top: 0px;padding-bottom: 64px;font-size: 1rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> If you have any questions about your order, please contact us at <a style='color:#000;font-weight:600;' href='mailto:" +
      contactEmail +
      "'>" +
      contactEmail +
      "</a>";
    if (mailConfig.contact_no) {
      html +=
        " or call us at <a style='color:#000;font-weight:600;' href='tel:" +
        mailConfig.contact_no +
        "'>" +
        mailConfig.contact_no +
        "</a>";
    }
    html += "</p></div>";
    // footer
    html += createGeneralFooter(storeDetails);
    resolve(html);
  });
};

exports.giftcard_purchased = function (storeDetails) {
  return new Promise((resolve, reject) => {
    let contactEmail = storeDetails.email;
    let mailConfig = storeDetails.mail_config;
    if (mailConfig.transporter) {
      contactEmail = mailConfig.transporter.auth.user;
    }
    let tempConfig = mailConfig.template_config;
    // header
    let html = createGeneralHeader(storeDetails);
    // main content
    html +=
      "<div style='font-size:30px;padding-top:15px;padding-left: 25px; padding-right: 25px;line-height:100%;font-family: " +
      tempConfig.font_family +
      "!important;' align='left'> <h1 style='font-size: 1.25rem;line-height: 2rem;' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1.25rem;margin-top: 32px;margin-bottom: 32px;'>Greetings from " +
      storeDetails.name +
      "!</h1> <p style='color: rgba(0,0,0,0.64);font-size:16px; font-weight:500;line-height: 2rem;font-family: " +
      tempConfig.font_family +
      "!important;'> You have purchased a " +
      storeDetails.name +
      " Gift Card <br> worth ##coupon_price## for ##to_name## on ##current_date##.</p> <p style='padding-top: 0px;font-size: 1rem;margin-top: 36px;margin-bottom: 8px;' align='left'>Gift Card Details</p> <table style='padding-top:0px;font-family: " +
      tempConfig.font_family +
      "!important;'> <tr> <td> <p style='margin:0;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
      tempConfig.font_family +
      "!important;'>Value</p> </td> <td> <p style='margin:0;padding-left:5px;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
      tempConfig.font_family +
      "!important;'>: ##coupon_price##</p> </td> </tr> <tr> <td> <p style='padding-top:0px;margin:0;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
      tempConfig.font_family +
      "!important;'>Received by</p> </td> <td> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
      tempConfig.font_family +
      "!important;'>: ##to_name##</p> </td> </tr> <tr> <td> <p style='padding-top:0px;margin:0;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
      tempConfig.font_family +
      "!important;'>Message</p> </td> <td> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
      tempConfig.font_family +
      "!important;'>: ##message##</p> </td> </tr> </table> <p style='max-width:720px;padding-top: 42px;padding-bottom: 42px;font-size: 1rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> They can start shopping now and apply their gift card code to their shopping bag during checkout on our online store at <a style='color:" +
      tempConfig.theme_color +
      ";font-weight:600' href='" +
      storeDetails.base_url +
      "'>" +
      storeDetails.website +
      "</a> </p> <p style='max-width:720px;padding-top: 0px;padding-bottom: 64px;font-size: 1rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> If you have any questions about your order, please contact us at <a style='color:#000;font-weight:600;' href='mailto:" +
      contactEmail +
      "'>" +
      contactEmail +
      "</a>";
    if (mailConfig.contact_no) {
      html +=
        " or call us at <a style='color:#000;font-weight:600;' href='tel:" +
        mailConfig.contact_no +
        "'>" +
        mailConfig.contact_no +
        "</a>";
    }
    html += "</p></div>";
    // footer
    html += createGeneralFooter(storeDetails);
    resolve(html);
  });
};

exports.donation = function (storeDetails) {
  return new Promise((resolve, reject) => {
    let contactEmail = storeDetails.email;
    let mailConfig = storeDetails.mail_config;
    if (mailConfig.transporter) {
      contactEmail = mailConfig.transporter.auth.user;
    }
    let tempConfig = mailConfig.template_config;
    // header
    let html = createGeneralHeader(storeDetails);
    // main content
    html +=
      "<div style='font-size:30px;padding-top:15px;padding-left: 25px; padding-right: 25px;line-height:100%;font-family: " +
      tempConfig.font_family +
      "!important' align='left'> <h1 style='font-size: 20px;'>Dear ##customer_name##,</h1> <h2 style='font-size: 18px;padding-top:20px'>Thank you for your generous contribution!</h2> <p style='max-width:730px;color:rgba(0,0,0,0.8);font-size:16px; line-height: 2rem;'> We have received a donation of ##donation_amount## from you on ##current_date##.</p> <p style='color:#000000; font-size:16px;padding-top:20px; font-weight:500;'> We, at " +
      storeDetails.name +
      ", greatly appreciate your donation in support to further our mission. </p> <p style='color:#000000; font-size:15px;padding-top:20px; font-weight:500;'> Your support is invaluable to us, thank you again. If you have any specific questions about our mission be sure to visit our website <a href='" +
      storeDetails.base_url +
      "' target='_blank' style='color:" +
      tempConfig.theme_color +
      ";font-weight:600;'>" +
      storeDetails.website +
      "</a> or reach out to us by email to <a style='color:#000;font-weight:600;' href='mailto:" +
      contactEmail +
      "'>" +
      contactEmail +
      "</a> </p> <p style='color:#000000; font-size:16px;padding:20px 0; font-weight:500;'> Sincerely, <br>Team " +
      storeDetails.name +
      "</p> </div>";
    // footer
    html += createGeneralFooter(storeDetails);
    resolve(html);
  });
};

exports.appointment_confirmed = function (storeDetails) {
  return new Promise((resolve, reject) => {
    let html = "Appointment Confirmed";
    resolve(html);
  });
};

// VENDOR
exports.order_placed_vendor = function (storeDetails) {
  return new Promise((resolve, reject) => {
    let contactEmail = storeDetails.email;
    let mailConfig = storeDetails.mail_config;
    if (mailConfig.transporter) {
      contactEmail = mailConfig.transporter.auth.user;
    }
    let tempConfig = mailConfig.template_config;
    // header
    let html = createGeneralHeader(storeDetails);
    // main content
    html +=
      "<div style='font-size:30px;padding-top:15px;padding-left: 25px;padding-bottom:30px; padding-right: 25px;line-height:100%;font-family: " +
      tempConfig.font_family +
      "!important;' align='left'> <h1 style='font-size: 1.25rem;line-height: 2rem;' align='left'>Hello ##vendor_name##,</h1> <h1 style='font-size: 1.25rem;margin-top: 32px;margin-bottom: 32px;'>You have received an order!</h1> <p style='color:rgba(0,0,0,0.64); font-size:1rem; font-weight:500;line-height: 1.75rem;margin-bottom: 32px;'> Kindly check and confirm the order status at the earliest.</p> <div style='font-size:1rem;color:#000; width:100%; padding-top:10px;padding-bottom:64px;overflow-x:auto;font-family: " +
      tempConfig.font_family +
      "!important;'> <table width='100%' border='0' cellpadding='0' cellspacing='0'> <tr style='padding:1rem 2.5rem;font-size:1rem;font-family: " +
      tempConfig.font_family +
      "!important;'> <td style='width:40%;font-size:1rem;background-color: #f6f6f6;padding-left:20px;font-family: " +
      tempConfig.font_family +
      "!important;'>Item</td> <td style='width:20%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
      tempConfig.font_family +
      "!important;'>SKU</td> <td style='width:15%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
      tempConfig.font_family +
      "!important;'>Qty.</td> <td style='width:25%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
      tempConfig.font_family +
      "!important;'>Subtotal</td> </tr>##item_list##</table> </div> <p style='max-width:720px;padding-top: 36px;padding-bottom: 36px;font-size: 1rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> Please keep it ready, our order handling team will be collecting it as soon as possible. <br> If you have any questions about your order, please contact us at <a style='color:#000;font-weight:600;' href='mailto:" +
      contactEmail +
      "'>" +
      contactEmail +
      "</a>";
    if (mailConfig.contact_no) {
      html +=
        " or call us at <a style='color:#000;font-weight:600;' href='tel:" +
        mailConfig.contact_no +
        "'>" +
        mailConfig.contact_no +
        "</a>";
    }
    html += "</p></div>";
    // footer
    html += createGeneralFooter(storeDetails);
    resolve(html);
  });
};

exports.order_cancelled_vendor = function (storeDetails) {
  return new Promise((resolve, reject) => {
    let contactEmail = storeDetails.email;
    let mailConfig = storeDetails.mail_config;
    if (mailConfig.transporter) {
      contactEmail = mailConfig.transporter.auth.user;
    }
    let tempConfig = mailConfig.template_config;
    // header
    let html = createGeneralHeader(storeDetails);
    // main content
    html +=
      "<div style='font-size:30px;padding-top:15px;padding-left: 25px; padding-right: 25px;line-height:100%;font-family: " +
      tempConfig.font_family +
      "!important;' align='left'> <h1 style='font-size: 1.25rem;line-height: 2rem;' align='left'>Hello ##vendor_name##,</h1> <h1 style='font-size: 1.25rem;margin-top: 32px;margin-bottom: 32px;'>Greetings from " +
      storeDetails.name +
      "!</h1> <p style='color: rgba(0,0,0,0.64);font-size:16px; font-weight:500;line-height: 2rem;font-family: " +
      tempConfig.font_family +
      "!important;'> The order ##order_number## has been cancelled.</p> <p style='padding-top: 0px;font-size: 1rem;margin-top: 36px;margin-bottom: 8px;' align='left'>Order Details</p> <table style='padding-top:0px;font-family: " +
      tempConfig.font_family +
      "!important;'> <tr> <td> <p style='margin:0;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
      tempConfig.font_family +
      "!important;'>Order ID</p> </td> <td> <p style='margin:0;padding-left:5px;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
      tempConfig.font_family +
      "!important;'>: ##order_number##</p> </td> </tr> <tr> <td> <p style='padding-top:0px;margin:0;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
      tempConfig.font_family +
      "!important;'>Order Date</p> </td> <td> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
      tempConfig.font_family +
      "!important;'>: ##order_date##</p> </td> </tr> </table> <p style='max-width:720px;padding-top: 42px;padding-bottom: 64px;font-size: 1rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'> If the order has already been picked up, a member of our team will get in touch with you as soon as possible and make sure the process goes as smooth as possible. <br> If you have any questions about your order, please contact us at <a style='color:#000;font-weight:600;' href='mailto:" +
      contactEmail +
      "'>" +
      contactEmail +
      "</a>";
    if (mailConfig.contact_no) {
      html +=
        " or call us at <a style='color:#000;font-weight:600;' href='tel:" +
        mailConfig.contact_no +
        "'>" +
        mailConfig.contact_no +
        "</a>";
    }
    html += "</p></div>";
    // footer
    html += createGeneralFooter(storeDetails);
    resolve(html);
  });
};

// STORE (Clients)
exports.enquiry = function (storeDetails) {
  return new Promise((resolve, reject) => {
    let mailConfig = storeDetails.mail_config;
    let tempConfig = mailConfig.template_config;
    if (storeDetails.type == "restaurant_based") {
      // header
      let html = createRestaurantHeader(storeDetails);
      // main content
      html +=
        "<div style='font-size:30px;padding-top:15px;padding-left: 25px;padding-right: 25px;padding-bottom: 64px;line-height:100%;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'> <h1 style='font-size: 1rem;line-height: 2rem;' align='left'>Hello Team,</h1> <h1 style='font-size: 1rem;margin-top: 20px;margin-bottom: 20px;'>You have a new enquiry!</h1> <p style='color: rgba(0,0,0,0.64);font-size:0.875rem; font-weight:500;line-height: 2rem;'> Please get in touch with them at the earliest.</p> <p style='padding-top: 0px;font-size: 0.875rem;margin-top: 40px;margin-bottom: 8px;' align='left'>Contact Details</p> <table style='padding-top:0px;font-family: " +
        tempConfig.font_family +
        "!important;'> <tr> <td> <p style='margin:0;font-size: 0.875rem;color: rgba(0,0,0,0.64);'>Name</p> </td> <td> <p style='margin:0;padding-left:5px;font-size: 0.875rem;color: rgba(0,0,0,0.64);'>: ##name##</p> </td> </tr> <tr> <td> <p style='padding-top:0px;margin:0;font-size: 0.875rem;color: rgba(0,0,0,0.64);'>Phone</p> </td> <td> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 0.875rem;color: rgba(0,0,0,0.64);'>: ##mobile##</p> </td> </tr> <tr> <td> <p style='padding-top:0px;margin:0;font-size: 0.875rem;color: rgba(0,0,0,0.64);'>Email</p> </td> <td> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 0.875rem;color: rgba(0,0,0,0.64);'>: ##email_id##</p> </td> </tr> <tr> <td> <p style='padding-top:0px;margin:0;font-size: 0.875rem;color: rgba(0,0,0,0.64);'>Message</p> </td> <td> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 0.875rem;color: rgba(0,0,0,0.64);'>: ##message##</p> </td> </tr> </table> </div>";
      // footer
      html += createRestaurantFooter(storeDetails);
      resolve(html);
    } else {
      // header
      let html = createGeneralHeader(storeDetails);
      // main content
      html +=
        "<div style='font-size:30px;padding-top:15px;padding-left: 25px;padding-right: 25px;padding-bottom: 64px;line-height:100%;font-family: " +
        tempConfig.font_family +
        "!important;' align='left'> <h1 style='font-size: 1.25rem;line-height: 2rem;' align='left'>Hello Team,</h1> <h1 style='font-size: 1.25rem;margin-top: 32px;margin-bottom: 32px;'>You have a new enquiry!</h1> <p style='color: rgba(0,0,0,0.64);font-size:16px; font-weight:500;line-height: 2rem;'> Please get in touch with them at the earliest.</p> <p style='padding-top: 0px;font-size: 1rem;margin-top: 48px;margin-bottom: 8px;' align='left'>Contact Details</p> <table style='padding-top:0px;font-family: " +
        tempConfig.font_family +
        "!important;'> <tr> <td> <p style='margin:0;font-size: 1rem;color: rgba(0,0,0,0.64);'>Name</p> </td> <td> <p style='margin:0;padding-left:5px;font-size: 1rem;color: rgba(0,0,0,0.64);'>: ##name##</p> </td> </tr> <tr> <td> <p style='padding-top:0px;margin:0;font-size: 1rem;color: rgba(0,0,0,0.64);'>Phone</p> </td> <td> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 1rem;color: rgba(0,0,0,0.64);'>: ##mobile##</p> </td> </tr> <tr> <td> <p style='padding-top:0px;margin:0;font-size: 1rem;color: rgba(0,0,0,0.64);'>Email</p> </td> <td> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 1rem;color: rgba(0,0,0,0.64);'>: ##email_id##</p> </td> </tr> <tr> <td> <p style='padding-top:0px;margin:0;font-size: 1rem;color: rgba(0,0,0,0.64);'>Message</p> </td> <td> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 1rem;color: rgba(0,0,0,0.64);'>: ##message##</p> </td> </tr> </table> </div>";
      // footer
      html += createGeneralFooter(storeDetails);
      resolve(html);
    }
  });
};

exports.vendor_enquiry = function (storeDetails) {
  return new Promise((resolve, reject) => {
    let mailConfig = storeDetails.mail_config;
    let tempConfig = mailConfig.template_config;
    // header
    let html = createGeneralHeader(storeDetails);
    // main content
    html +=
      "<div style='font-size:30px;padding-top:15px;padding-left: 25px;padding-right: 25px;padding-bottom: 64px;line-height:100%;font-family: " +
      tempConfig.font_family +
      "!important;' align='left'> <h1 style='font-size: 1.25rem;line-height: 2rem;' align='left'>Hello Team,</h1> <h1 style='font-size: 1.25rem;margin-top: 32px;margin-bottom: 32px;'>You have a new vendor enquiry!</h1> <p style='color: rgba(0,0,0,0.64);font-size:16px; font-weight:500;line-height: 2rem;'> Please get in touch with them at the earliest.</p> <p style='padding-top: 0px;font-size: 1rem;margin-top: 48px;margin-bottom: 8px;font-family: " +
      tempConfig.font_family +
      "!important;' align='left'>Vendor Contact Details</p> <table style='padding-top:0px;font-family: " +
      tempConfig.font_family +
      "!important;'> <tr> <td> <p style='margin:0;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
      tempConfig.font_family +
      "!important;'>Name</p> </td> <td> <p style='margin:0;padding-left:5px;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
      tempConfig.font_family +
      "!important;'>: ##name##</p> </td> </tr> <tr> <td> <p style='padding-top:0px;margin:0;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
      tempConfig.font_family +
      "!important;'>Company</p> </td> <td> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
      tempConfig.font_family +
      "!important;'>: ##company_name##</p> </td> </tr> <tr> <td> <p style='padding-top:0px;margin:0;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
      tempConfig.font_family +
      "!important;'>Email</p> </td> <td> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
      tempConfig.font_family +
      "!important;'>: ##email_id##</p> </td> </tr> <tr> <td> <p style='padding-top:0px;margin:0;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
      tempConfig.font_family +
      "!important;'>Mobile</p> </td> <td> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
      tempConfig.font_family +
      "!important;'>: ##mobile##</p> </td> </tr> </table> </div>";
    // footer
    html += createGeneralFooter(storeDetails);
    resolve(html);
  });
};

exports.vendor_order_confirmed = function (storeDetails) {
  return new Promise((resolve, reject) => {
    let mailConfig = storeDetails.mail_config;
    let tempConfig = mailConfig.template_config;
    // header
    let html = createGeneralHeader(storeDetails);
    // main content
    html +=
      "<div style='font-size:30px;padding-top:15px;padding-left: 25px;padding-right: 25px;line-height:100%;font-family: " +
      tempConfig.font_family +
      "!important;' align='left'> <h1 style='font-size: 1.25rem;line-height: 2rem;' align='left'>Hello " +
      storeDetails.name +
      ",</h1> <h1 style='font-size: 1.25rem;margin-top: 32px;margin-bottom: 32px;'>We have confirmed your order!</h1> <p style='padding-top: 0px;font-size: 1rem;margin-top: 36px;margin-bottom: 8px;font-family: " +
      tempConfig.font_family +
      "!important;' align='left'>Details</p> <table style='padding-top:0px;font-family: " +
      tempConfig.font_family +
      "!important;'> <tr> <td> <p style='padding-top:0px;margin:0;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
      tempConfig.font_family +
      "!important;'>Vendor</p> </td> <td> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
      tempConfig.font_family +
      "!important;'>: ##vendor_name##</p> </td> </tr> <tr> <td> <p style='margin:0;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
      tempConfig.font_family +
      "!important;'>Order ID</p> </td> <td> <p style='margin:0;padding-left:5px;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
      tempConfig.font_family +
      "!important;'>: ##order_number##</p> </td> </tr> <tr> <td> <p style='padding-top:0px;margin:0;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
      tempConfig.font_family +
      "!important;'>Date of Confirmation</p> </td> <td> <p style='padding-top:0px;margin:0;padding-left:5px;font-size: 1rem;color: rgba(0,0,0,0.64);font-family: " +
      tempConfig.font_family +
      "!important;'>: ##confirmed_date##</p> </td> </tr> </table> <div style='font-size:1rem;color:#000; width:100%; padding-top:42px;padding-bottom:42px;overflow-x:auto;font-family: " +
      tempConfig.font_family +
      "!important;'> <table width='100%' border='0' cellpadding='0' cellspacing='0'> <tr style='padding:1rem 2.5rem;font-size:1rem;font-family: " +
      tempConfig.font_family +
      "!important;'> <td style='width:40%;font-size:1rem;background-color: #f6f6f6;padding-left:20px;font-family: " +
      tempConfig.font_family +
      "!important;'>Item</td> <td style='width:20%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
      tempConfig.font_family +
      "!important;'>SKU</td> <td style='width:15%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
      tempConfig.font_family +
      "!important;'>Qty.</td> <td style='width:25%;padding:1rem 2.5rem;font-size:1rem;background-color: #f6f6f6;font-family: " +
      tempConfig.font_family +
      "!important;'>Subtotal</td> </tr>##item_list##</table> </div> <p style='max-width:720px;padding-top: 42px;padding-bottom: 64px;font-size: 1rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;font-family: " +
      tempConfig.font_family +
      "!important;'> Please initiate the order pickup process.</p> </div>";
    // footer
    html += createGeneralFooter(storeDetails);
    resolve(html);
  });
};

exports.store_signup = function (storeDetails) {
  return new Promise((resolve, reject) => {
    let html = "Test Mail";
    resolve(html);
  });
};

exports.ys_pwd_recovery = function () {
  return new Promise((resolve, reject) => {
    let bgImg =
      setupConfig.image_base +
      "yourstore/mail_header_bg.jpg?v=" +
      new Date().valueOf();
    let headerLogo =
      setupConfig.image_base +
      "yourstore/mail_header_logo.png?v=" +
      new Date().valueOf();
    // header
    let html =
      "<!doctype html> <html lang='en'> <head> <meta charset='utf-8'> <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'> <title>Yourstore</title> <link href='https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap' rel='stylesheet'> </head> <body style='margin:10px;'> <div style='width:100%;font-family: nunito,sans-serif!important'> <center> <div style='max-width:800px;border:1px solid rgba(0,0,0,0.1); border-radius:0 0 10px 10px; color:#000000;background: #fff;font-family: nunito,sans-serif!important'> <div align='center' style='width:100%;height:100px;position: relative;font-family: nunito,sans-serif!important; background-image: url(" +
      bgImg +
      ");background-repeat:no-repeat;width:100%;height:100px'> <table style='height:100%' cellpadding='0' cellspacing='0' align='center'> <tr><td align='center'> <div style='width:100%;display:flex;align-items: center;justify-content:center' align='center'> <img src='" +
      headerLogo +
      "' alt='yourstore'> </div> </td> </tr> </table> </div>";
    // main content
    html +=
      "<div style='font-size:30px;padding-top:15px;padding-left: 25px;padding-bottom:30px; padding-right: 25px;line-height:100%;font-family: nunito,sans-serif!important;' align='left'> <h1 style='font-size: 1.25rem;line-height: 2rem;' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1.25rem;margin-top: 32px;margin-bottom: 32px;'>Forgot your password?</h1> <p style='color:rgba(0,0,0,0.64); font-size:1rem; font-weight:500;line-height: 1.75rem;margin-bottom: 32px;font-family: nunito,sans-serif!important;'> You are just a step away from accessing your Yourstore account. <br/> Please click the link below to reset your password. This link is valid for 60 minutes and usable only once.</p> <div style='color:#000;font-size:0.875rem;padding:48px 0px;font-family: nunito,sans-serif!important;' align='center'> <a href='##recovery_link##' style='font-weight:600;text-decoration: none; background-color:#e23670;color:#fff!important; padding:1.25rem 1.75rem; line-height: 20px; font-size: 0.875rem;font-family: nunito,sans-serif!important;' align='center'>RESET YOUR PASSWORD</a> </div> </div>";
    // footer band
    html +=
      "<div style='padding:8px; background-color:#ec366b; font-size:0.875rem; border-radius:0 0 0px 0px;' align='center'><p style='margin-bottom: 0;margin-top:0;color:#fff!important;'>© " +
      new Date().getFullYear() +
      " <a style='text-decoration: underline;color:#fff!important;font-weight:bold; text-decoration: none;' href='https://yourstore.io' target='_blank'>Yourstore.</a> All Rights Reserved.</p> </div> </div> </center> </div> </body> </html>";
    resolve(html);
  });
};

exports.ys_pwd_updated = function () {
  return new Promise((resolve, reject) => {
    let bgImg =
      setupConfig.image_base +
      "yourstore/mail_header_bg.jpg?v=" +
      new Date().valueOf();
    let headerLogo =
      setupConfig.image_base +
      "yourstore/mail_header_logo.png?v=" +
      new Date().valueOf();
    // header
    let html =
      "<!doctype html> <html lang='en'> <head> <meta charset='utf-8'> <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'> <title>Yourstore</title> <link href='https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap' rel='stylesheet'> </head> <body style='margin:10px;'> <div style='width:100%;font-family: nunito,sans-serif!important'> <center> <div style='max-width:800px;border:1px solid rgba(0,0,0,0.1); border-radius:0 0 10px 10px; color:#000000;background: #fff;font-family: nunito,sans-serif!important'> <div align='center' style='width:100%;height:100px;position: relative;font-family: nunito,sans-serif!important; background-image: url(" +
      bgImg +
      ");background-repeat:no-repeat;width:100%;height:100px'> <table style='height:100%' cellpadding='0' cellspacing='0' align='center'> <tr><td align='center'> <div style='width:100%;display:flex;align-items: center;justify-content:center' align='center'> <img src='" +
      headerLogo +
      "' alt='yourstore'> </div> </td> </tr> </table> </div>";
    // main content
    html +=
      "<div style='font-size:30px;padding-top:15px;padding-left: 25px;padding-bottom:30px; padding-right: 25px;line-height:100%;font-family: nunito,sans-serif!important;' align='left'> <h1 style='font-size: 1.25rem;line-height: 2rem;' align='left'>Hello ##customer_name##,</h1> <h1 style='font-size: 1.25rem;margin-top: 32px;margin-bottom: 32px;'>Password reset.</h1> <p style='color:rgba(0,0,0,0.64); font-size:1rem; font-weight:500;line-height: 1.75rem;margin-bottom: 32px;'>The password for your Yourstore account ##email## was recently changed on <br/>##time##.</p> <p style='max-width:720px;padding-top: 30px;padding-bottom: 36px;font-size: 1rem;line-height: 2rem;margin-top: 0px;margin-bottom: 0px;'>If you don't recognize this activity, please get in touch with us at <a style='color:#000;font-weight:600;' href='mailto:sales@yourstore.io'>sales@yourstore.io</a> </p> </div>";
    // footer band
    html +=
      "<div style='padding:8px; background-color:#ec366b; font-size:0.875rem; border-radius:0 0 0px 0px;' align='center'><p style='margin-bottom: 0;margin-top:0;color:#fff!important;'>© " +
      new Date().getFullYear() +
      " <a style='text-decoration: underline;color:#fff!important;font-weight:bold; text-decoration: none;' href='https://yourstore.io' target='_blank'>Yourstore.</a> All Rights Reserved.</p> </div> </div> </center> </div> </body> </html>";
    resolve(html);
  });
};

// For Header
function createRestaurantHeader(storeDetails) {
  let tempConfig = storeDetails.mail_config.template_config;
  let bgImg =
    setupConfig.image_base +
    "yourstore/mail_header_bg.jpg?v=" +
    new Date().valueOf();
  let headerLogo =
    setupConfig.image_base +
    storeDetails._id +
    "/mail_logo.png?v=" +
    new Date().valueOf();
  let html =
    "<!doctype html> <html lang='en'> <head> <meta charset='utf-8'> <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'> <title>" +
    storeDetails.name +
    "</title> <link href='" +
    tempConfig.font_url +
    "' rel='stylesheet'> </head> <body style='margin:10px;'> <div style='width:100%;font-family: " +
    tempConfig.font_family +
    "!important'> <center> <div style='max-width:800px;border:1px solid rgba(0,0,0,0.1); border-radius:0 0 10px 10px; color:#000000;background: #fff;font-family: " +
    tempConfig.font_family +
    "!important'> <div align='center' style='width:100%;height:100px;position: relative;font-family: " +
    tempConfig.font_family +
    "!important; background-image: url(" +
    bgImg +
    ");background-repeat:no-repeat;width:100%;height:100px'> <table style='height:100%' cellpadding='0' cellspacing='0' align='center'> <tr> <td align='center'> <div style='width:100%;display:flex;align-items: center;justify-content:center' align='center'> <img src='" +
    headerLogo +
    "' alt='" +
    storeDetails.name +
    "'> </div> </td> </tr> </table> </div>";
  return html;
}
function createGeneralHeader(storeDetails) {
  let tempConfig = storeDetails.mail_config.template_config;
  let bgImg =
    setupConfig.image_base +
    "yourstore/mail_header_bg.jpg?v=" +
    new Date().valueOf();
  let headerLogo =
    setupConfig.image_base +
    storeDetails._id +
    "/mail_logo.png?v=" +
    new Date().valueOf();
  let html =
    "<!doctype html> <html lang='en'> <head> <meta charset='utf-8'> <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'> <title>" +
    storeDetails.name +
    "</title> <link href='" +
    tempConfig.font_url +
    "' rel='stylesheet'> </head> <body style='margin:10px;'> <div style='width:100%;font-family: " +
    tempConfig.font_family +
    "!important'> <center> <div style='max-width:800px;border:1px solid rgba(0,0,0,0.1); border-radius:0 0 10px 10px; color:#000000;background: #fff;font-family: " +
    tempConfig.font_family +
    "!important'> <div align='center' style='width:100%;height:100px;position: relative;font-family: " +
    tempConfig.font_family +
    "!important; background-image: url(" +
    bgImg +
    ");background-repeat:no-repeat;width:100%;height:100px'> <table style='height:100%' cellpadding='0' cellspacing='0' align='center'> <tr> <td align='center'> <div style='width:100%;display:flex;align-items: center;justify-content:center' align='center'> <img src='" +
    headerLogo +
    "' alt='" +
    storeDetails.name +
    "'> </div> </td> </tr> </table> </div>";
  return html;
}

// For Footer
function createRestaurantFooter(storeDetails) {
  let tempConfig = storeDetails.mail_config.template_config;
  let bandConfig = storeDetails.mail_config.band_config;
  let footerLogo =
    setupConfig.image_base +
    "yourstore/dinamic_logo_black.png?v=" +
    new Date().valueOf();
  if (bandConfig.txt_color == "#fff") {
    footerLogo =
      setupConfig.image_base +
      "yourstore/dinamic_logo_white.png?v=" +
      new Date().valueOf();
  }
  let html =
    "<div style='margin-left:25px;margin-right:25px;border-top:1px solid rgba(0, 0, 0, 0.1);font-family: " +
    tempConfig.font_family +
    "!important;' align='center'></div> <table style='text-align: right; width:100%;font-family: " +
    tempConfig.font_family +
    "!important;'> <tr align='right'> <td align='right'> <div style='margin-bottom:0px;display:table;justify-content:flex-end;position: relative; margin-top:20px; margin-bottom:20px;margin-right: 20px;font-family: " +
    tempConfig.font_family +
    "!important;' align='right'> <a align='right' style='display:flex;justify-content:flex-end;align-items:center;font-weight:500;text-decoration: none; background-color:" +
    bandConfig.bg_color +
    ";border-radius: 15px;padding: 10px 18px 10px 15px;' href='https://dinamic.io' target='_blank'> <span style='width:50%;display:flex;align-items:center;float:left;font-weight: 500;color: " +
    bandConfig.txt_color +
    ";font-size: 0.875rem;line-height: 2;text-align: left;'>Powered by</span> <span style='width:50%; float:right;'> <img src='" +
    footerLogo +
    "' style='width:80px;height: auto;vertical-align: middle!important;' alt='Dinamic'> </span> </a> </div> </td> </tr> </table>";
  // footer band
  html +=
    "<div style='padding:8px; background-color:" +
    tempConfig.theme_color +
    "; font-size:0.875rem; border-radius:0 0 0px 0px; font-family: " +
    tempConfig.font_family +
    "!important;' align='center'> <p style='margin-bottom: 0;margin-top:0;color:" +
    tempConfig.txt_color +
    "!important'>© ##copy_year## <a style='text-decoration: underline;color:" +
    tempConfig.txt_color +
    "!important;font-weight:bold; text-decoration: none;' href='" +
    storeDetails.base_url +
    "' target='_blank'>" +
    storeDetails.name +
    ".</a> All Rights Reserved.</p> </div> </div> </center> </div> </body> </html>";
  return html;
}
function createGeneralFooter(storeDetails) {
  let tempConfig = storeDetails.mail_config.template_config;
  let bandConfig = storeDetails.mail_config.band_config;
  let footerLogo =
    setupConfig.image_base +
    "yourstore/mail_logo_black.png?v=" +
    new Date().valueOf();
  if (bandConfig.txt_color == "#fff") {
    footerLogo =
      setupConfig.image_base +
      "yourstore/mail_logo_white.png?v=" +
      new Date().valueOf();
  }
  let html =
    "<div style='margin-left:25px;margin-right:25px;border-top:1px solid rgba(0, 0, 0, 0.1);font-family: " +
    tempConfig.font_family +
    "!important;' align='center'></div> <table style='text-align: right; width:100%;font-family: " +
    tempConfig.font_family +
    "!important;'> <tr align='right'> <td align='right'> <div style='margin-bottom:0px;display:table;justify-content:flex-end;position: relative; margin-top:20px; margin-bottom:20px;margin-right: 20px;font-family: " +
    tempConfig.font_family +
    "!important;' align='right'><a align='right' style='display:flex;justify-content:flex-end;align-items:center;font-weight:500;text-decoration: none; padding-right:20px; background-color:" +
    bandConfig.bg_color +
    ";border-radius: 15px;padding: 5px 15px;' href='https://yourstore.io' target='_blank'><span style='width:75%;display:flex;align-items:center;float:left;font-weight: 500;color: " +
    bandConfig.txt_color +
    ";font-size: 0.875rem;line-height: 2.9;text-align: left;padding: 5px;'>Ecommerce website by</span><span style='width:25%; float:right;'> <img src='" +
    footerLogo +
    "' style='line-height: 1.45;padding: 5px; width:50px; height: auto;vertical-align: middle!important;' alt='Yourstore'> </span></a> </div> </td> </tr> </table>";
  // footer band
  html +=
    "<div style='padding:8px; background-color:" +
    tempConfig.theme_color +
    "; font-size:0.875rem; border-radius:0 0 0px 0px; font-family: " +
    tempConfig.font_family +
    "!important;' align='center'> <p style='margin-bottom: 0;margin-top:0;color:" +
    tempConfig.txt_color +
    "!important'>© ##copy_year## <a style='text-decoration: underline;color:" +
    tempConfig.txt_color +
    "!important;font-weight:bold; text-decoration: none;' href='" +
    storeDetails.base_url +
    "' target='_blank'>" +
    storeDetails.name +
    ".</a> All Rights Reserved.</p> </div> </div> </center> </div> </body> </html>";
  return html;
}
