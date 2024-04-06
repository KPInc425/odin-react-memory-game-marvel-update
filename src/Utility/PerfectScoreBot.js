
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const titleParagraphs = document.querySelectorAll('#cardTitle p');
const titleArray = Array.from(titleParagraphs).map(node => node.innerText);
console.log("Length: ", titleArray.length);

async function clickNodes() {
  for (let i = 0; i < titleArray.length; i++) {
    console.log(i);
    let currentTitle = titleArray[i];
    console.log(currentTitle);

    // let titleNodeToFindArray = document.querySelectorAll('#cardTitle');
    let nodeToClick = Array.from(titleParagraphs).find((node) => node.innerText === currentTitle);

    if (nodeToClick) {
      console.log(nodeToClick.innerText);
      nodeToClick.click();

      // Wait for the nodes to be re-rendered or modified
      await delay(1); // Adjust the delay based on your application's behavior

      let scoreBoard = document.querySelector('#score');
      console.log(scoreBoard.innerText);
    } else {
      console.log("Node not found for: ", currentTitle);
    }
  }
}

clickNodes();
