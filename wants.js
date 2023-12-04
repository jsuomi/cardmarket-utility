/**
 * Copy deck list to clipboard
 */

function copyDeckList() {
  let rows = document.querySelectorAll('table.data-table > tbody > tr');
  let output = [];

  rows.forEach(row => {
    let amountCell = row.querySelector('td.amount');
    let nameCell = row.querySelector('td.name');
    if (amountCell && nameCell) {
      let amount = amountCell.textContent.trim();
      let cardName = nameCell.querySelector('a').textContent.trim();
      output.push(amount + ' ' + cardName);
    }
  });

  let deckListStr = output.join('\r\n');
  navigator.clipboard.writeText(deckListStr).then(() => {
    console.log("Deck list copied to clipboard");
  }).catch(err => {
    console.log("Failed to copy deck list: ", err);
  });
}

// Try finding the targetDiv multiple times if not immediately available
function tryAppendCopyButtonToWants() {
  const targetDiv = document.querySelector('div.d-none.d-lg-flex.flex-column.flex-lg-row.justify-content-between.align-items-center.mb-4 > .d-flex.align-items-center');
  const targetDivAdded = document.querySelector("#copyDeckListButton");

  if (targetDiv && !targetDivAdded) {
    const newButton = document.createElement("a");
    newButton.id = "copyDeckListButton";
    newButton.href = "javascript:void(0);";
    newButton.role = "button";
    newButton.className = "btn btn-outline-success ml-3";
    newButton.style = "margin-left: 1rem !important;";
    
    const iconSpan = document.createElement("span");
    iconSpan.className = "fonticon-copy me-2";
    newButton.appendChild(iconSpan);
    
    const textSpan = document.createElement("span");
    textSpan.textContent = "Copy Deck List";
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
    setTimeout(tryAppendCopyButtonToWants, 300); // Wait and try again
  }
  
  const targetDivMobile = document.querySelector("#MobileActions");
  const targetDivMobileAdded = document.querySelector("#copyDeckListButtonMobile");

  if(targetDivMobile && !targetDivMobileAdded) {
    // <div class="d-grid w-100"><a href="/en/Magic/Wants/ShoppingWizard?idWantsList=16405886" role="button" class="btn btn-primary mt-2 mt-md-0 d-md-flex col-md justify-content-md-center align-items-md-center"><span class="fonticon-wand me-2"></span><span>Shopping Wizard</span></a></div>
    const newButton = document.createElement("a");
    newButton.id = "copyDeckListButtonMobile";
    newButton.href = "javascript:void(0);";
    newButton.role = "button";
    newButton.className = "btn btn-outline-success mt-2 mt-md-0 d-md-flex col-md justify-content-md-center align-items-md-center";

    const iconSpan = document.createElement("span");
    iconSpan.className = "fonticon-copy me-2";
    newButton.appendChild(iconSpan);

    const textSpan = document.createElement("span");
    textSpan.textContent = "Copy Deck List";
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

    targetDivMobile.appendChild(newButton);
  } else {
    setTimeout(tryAppendCopyButtonToWants, 300); // Wait and try again
  }
}

tryAppendCopyButtonToWants();