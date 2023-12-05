function copyDeckList() {
  let rows = document.querySelectorAll('table.product-table > tbody > tr');
  let output = [];

  rows.forEach(row => {
    let amountCell = row.querySelector('td.amount');
    let nameCell = row.querySelector('td.name');
    if (amountCell && nameCell) {
      let amount = amountCell.textContent.trim().replace('x', '');
      let cardName = nameCell.querySelector('a').textContent.trim();
      // regex replace (V.1), (V.2), etc. with nothing
      cardName = cardName.replace(/\(V\.\d+\)/g, '');
      output.push(amount + ' ' + cardName);
    }
  });

  let deckListStr = output.join('\r\n');
  navigator.clipboard.writeText(deckListStr).then(() => {
    console.log("Card list copied to clipboard");
    console.log(deckListStr);
  }).catch(err => {
    console.log("Failed to copy card list: ", err);
  });
}

function tryAppendCopyButtonToPurchases() {
  const targetDiv = document.querySelector("body > main > section > div > div.col-12.col-lg-9.pe-lg-3.mb-3.mb-lg-0 > div > div.category-subsection");

  if (targetDiv) {
    const newButton = document.createElement("a");
    newButton.href = "javascript:void(0);";
    newButton.role = "button";
    newButton.className = "btn btn-outline-success ml-3";
    newButton.style = "margin-left: 1rem !important;";

    const iconSpan = document.createElement("span");
    iconSpan.className = "fonticon-copy me-2";
    newButton.appendChild(iconSpan);

    const textSpan = document.createElement("span");
    textSpan.textContent = "Copy Card List";
    newButton.appendChild(textSpan);

    newButton.addEventListener("click", function (el) {
      // console.log("clicked button", el);
      copyDeckList();

      // Change button text to "Copied"
      textSpan.textContent = "Copied!";

      // Revert back to original text after 2 seconds
      setTimeout(() => {
        textSpan.textContent = "Copy Deck List";
      }, 1000);
    });


    targetDiv.appendChild(newButton);
    // console.log("added button");
  } else {
    setTimeout(tryAppendCopyButtonToPurchases, 300); // Wait and try again
  }
}

tryAppendCopyButtonToPurchases();