exports.studyCertificate = (sName, sYear, sGroup, sRoll, sAcademicYear) => {
  var template = {
    pageSize: {
      width: 982,
      height: 718,
    },
    content: [
      {
        columns: [
          {
            image: "ttdlogo.jpg",
            width: 100,
          },
          {
            text: "\n\nTIRUMALA TIRUPATI DEVASTHANAMS, TIRUPATI ",
            bold: true,
            alignment: "center",
            fontSize: 15,
          },
          {
            image: "black.jpg",
            width: 100,
          },
        ],
      },

      {
        text: "SRI VENKATESWRA ARTS COLLEGE",
        alignment: "center",
        fontSize: 35,
        bold: true,
      },
      {
        text: "TIRUPATI",
        alignment: "center",
        fontSize: 20,
        bold: true,
      },
      {
        text: "\nSTUDY CERTIFICATE\n",
        alignment: "center",
        fontSize: 30,
        bold: true,
        decoration: "underline",
      },
      // break from here

      {
        text:
          "This is to certify that Mr/Mrs. " +
          sName +
          " is/was a student of this college, who studied/is studying " +
          sYear +
          " " +
          sGroup +
          "course with Roll no " +
          sRoll +
          " during the academics year " +
          sAcademicYear,
        margin: [0, 50, 0, 0],
        fontSize: 25,
        lineHeight: 2,
      },
      {
        text: "Tirupati",
        margin: [0, 100, 0, 0],
        fontSize: 20,
      },
      {
        text: "PRINCPAL",
        alignment: "right",
        fontSize: 25,
      },
    ],
  };

  return template;
};
