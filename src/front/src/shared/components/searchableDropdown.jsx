import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const DropdownContainer = styled.div`
  position: relative;
  width: 250px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Control = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--secondary);
  border-radius: ${(props) => (props.isOpen ? "25px 25px 0 0" : "30px")};
  padding: 6px;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  padding: 10px;
  color: var(--secondary);
  background-color: var(--primary);
  border-radius: ${(props) => (props.isOpen ? "20px 20px 0 20px" : "20px")};
`;

const SelectedValue = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
  padding: 0 10px;
  margin: 0;
  color: var(--primary);
  background-color: transparent;
  &::placeholder {
    color: var(--primary);
  }
`;

const Options = styled.div`
  position: absolute;
  padding: 5px;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  color: var(--primary);
  font-weight: 600;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  background-color: var(--secondary);
`;

const Option = styled.div`
  padding: 0.5rem;
  background-color: var(--secondary);
  cursor: pointer;
`;

const SearchableDropdown = ({
  options,
  label,
  id,
  selectedVal,
  handleChange,
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);

  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const filtered = options.filter((option) =>
      option[label].toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredOptions(filtered);
    setIsOpen(filtered.length > 0 && query !== "");
  }, [query, options, label]);

  const selectOption = (option) => {
    setQuery("");
    handleChange(option[label]);
    setIsOpen(false);
  };

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;
    return "";
  };

  return (
    <DropdownContainer>
      <Control isOpen={isOpen}>
        <SelectedValue
          ref={inputRef}
          type="text"
          value={getDisplayValue()}
          placeholder="Pesquise aqui..."
          name="searchTerm"
          onChange={(e) => {
            setQuery(e.target.value);
            handleChange(null);
          }}
        />
        <SearchIcon isOpen={isOpen} icon={faSearch} />
      </Control>
      <Options isOpen={isOpen}>
        {filteredOptions.map((option, index) => (
          <Option
            key={`${id}-${index}`}
            onClick={() => selectOption(option)}
            selected={option[label] === selectedVal}
          >
            {option[label]}
          </Option>
        ))}
      </Options>
    </DropdownContainer>
  );
};

export default SearchableDropdown;
