import { HotTable } from "@handsontable/react";
import Handsontable from "handsontable";
import "../../index.css";
import { registerRenderer, textRenderer } from "handsontable/renderers";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.min.css";
import chroma from "chroma-js";

// register Handsontable's modules
registerAllModules();

const HandsontableWidget = (props: any) => {
  chroma("#D4F880").darken().hex();

  function negativeValueRenderer(
    this: Handsontable,
    instance: any,
    td: any,
    row: any,
    col: any,
    prop: any,
    value: any,
    cellProperties: any
  ) {
    textRenderer.apply(
      this,
      arguments as unknown as [
        Handsontable,
        HTMLTableCellElement,
        number,
        number,
        string | number,
        Handsontable.CellValue,
        Handsontable.CellProperties
      ]
    );

    const color = chroma.scale(["white", "red"]).domain([-999999, 999999])(
      value
    );

    td.style.background = color;
  }

  //  maps function to a lookup string
  registerRenderer("negativeValueRenderer", negativeValueRenderer);

  return (
    <HotTable
      data={props?.tableData}
      rowHeaders={true}
      colHeaders={props?.tableHeaders}
      height="auto"
      width={"100%"}
      autoWrapRow={true}
      autoWrapCol={true}
      licenseKey="non-commercial-and-evaluation"
      afterSelection={function (this: Handsontable, row, col, row2, col2) {
        const meta = this.getCellMeta(row2, col2);

        if (meta.readOnly) {
          this.updateSettings({ fillHandle: false });
        } else {
          this.updateSettings({ fillHandle: true });
        }
      }}
      cells={function (row, col) {
        const cellProperties = {
          renderer: "",
        };
        cellProperties.renderer = "negativeValueRenderer"; // uses lookup map

        return cellProperties;
      }}
    />
  );
};

export default HandsontableWidget;
