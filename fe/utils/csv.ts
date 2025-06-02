import { json2csv } from "json-2-csv";

import { Question, Quizz } from "@/types/quizz";
import { ALPHABET_OPTIONS } from "@/constants";

export const exportCsv = async (jsonData: object[], filename: string) => {
	const csv = await json2csv(jsonData);

	const blob = new Blob([csv], { type: "text/csv" });
	const url = URL.createObjectURL(blob);

	const link = document.createElement("a");
	link.href = url;
	link.download = `${filename}.csv`;

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

export const getCsvDataFromQuizz = (
	questions: Question[],
	quizz?: Quizz & {
		name: string;
		description: string;
		user_id: number;
	}
): object[] => {
	if (!quizz) return [];

	let exportedJson: object[] = [];

	questions.forEach((question) => {
		let questionJson: Record<string, string> = {};
		switch (question.type) {
			case "multiple_choice":
				questionJson = {
					"Quizz ID": quizz?.id,
					Question: question.question,
				};
				question.choice.forEach((option, index) => {
					questionJson[`Option ${ALPHABET_OPTIONS[index].value}`] = option.answer;
				});
				const correctAnswer = question.choice.find((option) => option.correct)?.answer;
				questionJson["Correct Answer"] = correctAnswer || "";
				questionJson["Explanation"] = question.explanation || "";
				exportedJson.push(questionJson);
				break;
			case "true_false":
				questionJson = {
					"Quizz ID": quizz?.id,
					Question: question.question,
				};
				questionJson["Option A"] = "True";
				questionJson["Option B"] = "False";
				questionJson["Correct Answer"] = question.answer ? "True" : "False";
				questionJson["Explanation"] = question.explanation || "";
				exportedJson.push(questionJson);
				break;
			case "fill_in_the_blank":
				questionJson = {
					"Quizz ID": quizz?.id,
					Question: question.question,
					"Correct Answer": question.answer,
					Explanation: question.explanation || "",
				};
				exportedJson.push(questionJson);
				break;
			default:
				break;
		}
	});
	const uniqueColumns = Array.from(new Set(exportedJson.flatMap((question) => Object.keys(question))));

	exportedJson = exportedJson.map((question) => {
		const missedColumns = uniqueColumns.filter((column) => !Object.keys(question).includes(column));
		missedColumns.forEach((column) => {
			(question as Record<string, string>)[column] = "";
		});
		return question;
	});

	return exportedJson;
};
