import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import Loading from "../Loading";

export default function Answer({ answer, idx}) {

  const [isLoading, setLoading] = useState(false);
  const [userData, setUserData] = useContext(UserContext);
  const oneDriveTokenUrl =
    "https://laboratory.binus.ac.id/lapi/api/Account/GetOneDriveToken";

  const getFormattedDate = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "Mei",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const d = new Date(date);
    let minutes;
    let seconds;
    let hours;

    d.getHours().toString().length == 1
      ? (hours = "0" + d.getHours())
      : (hours = d.getHours());
    d.getMinutes().toString().length == 1
      ? (minutes = "0" + d.getMinutes())
      : (minutes = d.getMinutes());
    d.getSeconds().toString().length == 1
      ? (seconds = "0" + d.getSeconds())
      : (seconds = d.getSeconds());

    return `${d.getDate()} ${
      months[d.getMonth()]
    } ${d.getFullYear()}, ${hours}:${minutes}:${seconds}`;
  };

  const getDownloadUrl = async (source) => {
    setLoading(true);

    const { token } = await axios
      .get(oneDriveTokenUrl, {
        headers: {
          authorization: `Bearer ${userData.Token.token}`,
        },
      })
      .then((res) => res.data);

    const fileFromUrl = await axios
      .get(source, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);

    setLoading(false);
    window.location.href = fileFromUrl["@microsoft.graph.downloadUrl"];
  };


  return (
    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-100"}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {answer.Type}-{answer.Number}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {answer.StatusFile}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">{answer.Uploader}</td>
      <td className="px-6 py-4 text-sm text-gray-900 ">
        {getFormattedDate(answer.UploadDate)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {answer.FinalizedBy == null ? "-" : answer.FinalizedBy}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">
        {answer.FinalizedDate == null
          ? "-"
          : getFormattedDate(answer.FinalizedDate)}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">{answer.Hash}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {answer.TotalSize}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600">
        <button
          type="button"
          className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-binus-blue bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-binus-blue"
          onClick={() => getDownloadUrl(answer.Source)}
        >
          {isLoading && <Loading color="text-binus-blue" />}
          Download
        </button>
      </td>
    </tr>
  );
}
