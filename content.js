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
function tryAppendButton() {
    const targetDiv = document.querySelector('div.d-none.d-lg-flex.flex-column.flex-lg-row.justify-content-between.align-items-center.mb-4 > .d-flex.align-items-center');
    if (targetDiv) {
        const newButton = document.createElement("a");
        newButton.href = "javascript:void(0);";
        newButton.role = "button";
        newButton.className = "btn btn-outline-success ml-3";

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
        setTimeout(tryAppendButton, 300); // Wait and try again
    }
}

tryAppendButton();
