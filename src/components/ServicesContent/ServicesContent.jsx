import ServiceLgo from "../../assets/icons/ServiceLogo.svg";

export default function ServicesContent({ heading, text }) {
  const formattedText = text.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));

  const highlightedHeading = heading.replace(
    /ezyfiling/gi,
    (match) => `<span class="bg-[#fddc5e] px-1">${match}</span>`
  );

  return (
    <div className="relative">
      <div
        className="text-3xl font-semibold flex justify-center"
        dangerouslySetInnerHTML={{ __html: highlightedHeading }}
      />
      <div className="mt-16 text-justify text-gray-500">{formattedText}</div>
      <img
        src={ServiceLgo}
        alt="img"
        className="absolute hidden md:block -bottom-28 -left-28"
      />
    </div>
  );
}
