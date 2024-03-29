import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
} from "@fluentui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NaviagtionState } from "../Navigation/Navigation";
import { questionSelector } from "./QuestionSlice";

export interface IQuestion {
  id: number;
  desription: string;
  status: boolean;
  avgAttempts?: number;
  avgClauses?: number;
  solution?: string;
}

export default function Question(props: NaviagtionState) {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const questionDetails = useSelector(questionSelector);
  useEffect(() => {
    if (questionDetails.questions.length > 0) {
      let questionList: IQuestion[] = [];
      for (let i = 0; i < questionDetails.questions.length; i++) {
        questionList.push({
          id: questionDetails.questions[i].ID,
          desription: questionDetails.questions[i].Description,
          status: questionDetails.questions[i].Status,
        });
      }
      setQuestions(questionList);
    }
  }, [questionDetails.questions]);
  
  const cols: IColumn[] = [
    {
      key: "column1",
      name: "#",
      fieldName: "no",
      minWidth: 40,
      maxWidth: 60,
      isRowHeader: true,
      isResizable: true,
      onRender: (item: IQuestion) => {
        return (
          item.id
        );
      },
      data: "string",
      isPadded: true,
    },
    {
      key: "column2",
      name: "Description",
      fieldName: "description",
      minWidth: 850,
      maxWidth: 1000,
      isResizable: true,
      data: "number",
      onRender: (item: IQuestion) => {
        return (
          <a
            style={{ color: "#0064BF" }}
            href="javascript:void(0)"
            onClick={() => {
              props.setNavState("-1");
              props.setNavQuestionId!(Number(item.id));
            }}
          >
            {item.desription}
          </a>
        );
      },
      isPadded: true,
    },
    {
      key: "column3",
      name: "Status",
      fieldName: "status",
      minWidth: 70,
      maxWidth: 90,
      data: "number",
      onRender: (item: IQuestion) => {
        return <span>{item.status ? "Success" : "Failure"}</span>;
      },
      isPadded: true,
    },
  ];
  const [columns, setColumns] = useState<IColumn[]>(cols);
  const _getKey = (item: any, index?: number): string => {
    return item.id;
  };
  return (
    <div style={{ width: "100%" }}>
      <DetailsList
        items={questions}
        columns={columns}
        selectionMode={SelectionMode.none}
        getKey={_getKey}
        setKey="none"
        layoutMode={DetailsListLayoutMode.justified}
        isHeaderVisible={true}
        styles={{
          headerWrapper: {
            marginTop: "-14px",
          },
        }}
      />
    </div>
  );
}
