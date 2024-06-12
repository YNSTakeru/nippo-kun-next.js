import { locales } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReport } from "../../../../redux/store/modules/confirmReport";
import { startLoading } from "../../../../redux/store/modules/loading";
import { write } from "../../../../redux/store/modules/pdcaList";

export default function Editor({
  order = "PDCA",
  setMarkdown,
  initialData = [{}],
}) {
  const dispatch = useDispatch();
  const doneName = useSelector((state) => state.doneNamer.doneName);

  const pdca = useSelector(
    (state) =>
      state.pdcaLister.pdcaList.filter((item) => item.doneName === doneName)[0]
  );

  for (
    let i = 0;
    pdca[order.toLowerCase() + "Block"] &&
    i < pdca[order.toLowerCase() + "Block"].length;
    i++
  ) {
    initialData.push(pdca[order.toLowerCase() + "Block"][i]);
    if (i === 0) {
      initialData.shift();
    }
  }

  useEffect(() => {
    if (order === "confirm") {
      editor.blocksToMarkdownLossy(editor.document).then((markdown) => {
        dispatch(setReport(markdown));
        dispatch(startLoading());
      });
    }
  }, [initialData]);

  const editor = useCreateBlockNote({
    initialContent: initialData,
    dictionary: locales.ja,
  });

  const onChange = async () => {
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    setMarkdown(markdown);

    switch (order) {
      case "Plan":
        dispatch(
          write({
            plan: markdown,
            planBlock: editor.document,
            doneName,
          })
        );
        break;
      case "Do":
        dispatch(write({ do: markdown, doBlock: editor.document, doneName }));

        break;
      case "Check":
        dispatch(
          write({ check: markdown, checkBlock: editor.document, doneName })
        );
        break;
      case "Action":
        dispatch(
          write({ action: markdown, actionBlock: editor.document, doneName })
        );
        break;
      case "confirm":
        dispatch(setReport(markdown));
        break;
      default:
        break;
    }
  };

  return (
    <BlockNoteView
      editor={editor}
      onChange={onChange}
      sideMenu={false}
      slashMenu={true}
      linkToolbar={false}
      data-theming-css
    />
  );
}
