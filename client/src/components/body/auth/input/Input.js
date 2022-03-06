const Input = ({icon,handleClick,type,name,handleChange,defaultValue,disabled,text}) => {
  return (
    <div className="input">
      <label>
        <div className="input_icon" onClick={handleClick}>
          {icon}
        </div>
        <input
          type={type}
          name={name}
          onChange={handleChange}
          defaultValue={defaultValue}
          disabled={disabled}
          autoComplete="off"
          placeholder="&nbsp;"
        />
        <span>{text}</span>
      </label>
    </div>
  );
};

export default Input;
