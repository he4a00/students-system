import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const SearchBar = ({ onSearch }: any) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchValue);
  };

  return (
    <div className="flex gap-5 rounded">
      <Input
        className="bg-[#1f1f1f] text-white font-semibold"
        type="text"
        placeholder="ابحث عن الطالب"
        value={searchValue}
        onChange={handleInputChange}
      />
      <Button variant="secondary" onClick={handleSearchClick}>
        بحث
      </Button>
    </div>
  );
};

export default SearchBar;
