import { CardsByYear } from "../../interfaces/CardsByYear";
import { PrintableItem } from "../../interfaces/PrintableItems";

export const getPrintableItems = (
  groupedCards: CardsByYear[],
): PrintableItem[] => {
  const printableItems: PrintableItem[] = [];
  for (const group of groupedCards) {
    // add year
    printableItems.push({ type: "year", year: group.year });
    // add all projects
    for (const project of group.cards) {
      printableItems.push({ type: "project", project: project });
    }
  }
  const p1 = adjustHeaderBlankFooter(printableItems);
  return p1;
};

const adjustHeaderBlankFooter = (printableItems: PrintableItem[]) => {
  console.log("printableItems size: ", printableItems.length);
  const itemPerPage = 10;
  const maxItemPerPage = itemPerPage - 2;
  // purpose is to add a header and footer every 8 elements, in order to make 10 elements per page

  let pageCounter = 0;
  const totalPage = Math.ceil(printableItems.length / maxItemPerPage);
  const remainingBlank =
    (maxItemPerPage - (printableItems.length % maxItemPerPage)) %
    maxItemPerPage;

  // add footer every 8 items.
  const p1: PrintableItem[] = [];
  for (let i = 0; i < printableItems.length; i++) {
    if (i % maxItemPerPage === 0) {
      if (i > 0) {
        // add footer
        pageCounter++;
        p1.push({ type: "footer", current: pageCounter, total: totalPage });
      }
      // then add header
      p1.push({ type: "header" });
    }
    p1.push(printableItems[i]);
  }
  // at the end complet with blank
  for (let i = 0; i < remainingBlank; i++) {
    p1.push({ type: "blank" });
  }
  // and a footer
  pageCounter++;
  p1.push({ type: "footer", current: pageCounter, total: totalPage });

  return p1;
};
