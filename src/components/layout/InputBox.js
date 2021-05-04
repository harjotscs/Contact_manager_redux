const InputBox = (props) => {
  const {
    type,
    placeholder,
    name,
    value,
    handleChange,
    className,
    dataTitle,
    dataIntro,
  } = props;
  return (
    <input
      className={className}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      data-title={dataTitle}
      data-intro={dataIntro}
      data-disable-interaction={true}
      id=""
    />
  );
};

export default InputBox;
