"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import {
  countriesOptions,
  filmGenresOptions,
  orderByOptions,
  typeRawOptions,
  yearOptions,
} from "@/constants/filter";
import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TextAlignBottomIcon } from "@radix-ui/react-icons";
import Accordion from "@/components/ui/accordion";

export default function FilterMovie({
  onFilter,
}: {
  onFilter: (q: any) => void;
}) {
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [typeRaw, setTypeRaw] = useState("");
  const [year, setYear] = useState("");
  const [expanded, setExpanded] = useState(false);

  const OrderBy: React.FC = () => {
    return (
      <motion.div>
        <p className="mb-2 font-bold text-sm lg:text-base">Lọc theo</p>
        <Select value={orderBy} onValueChange={setOrderBy}>
          <SelectTrigger>
            {orderByOptions.find((item: any) => item.value === orderBy)
              ?.label || "All"}
          </SelectTrigger>
          <SelectContent>
            {orderByOptions.map((item: any) => (
              <SelectItem key={item.value} value={item.value}>
                <span>{item.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>
    );
  };

  const FilmGenres: React.FC = () => {
    return (
      <motion.div>
        <p className="mb-2 font-bold text-sm lg:text-base">Thể loại</p>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            {filmGenresOptions.find((item: any) => item.value === category)
              ?.label || "All"}
          </SelectTrigger>
          <SelectContent>
            {filmGenresOptions.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                <span>{item.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>
    );
  };

  const Countries: React.FC = () => {
    return (
      <motion.div>
        <p className="mb-2 font-bold text-sm lg:text-base">Quốc Gia</p>
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger>
            {countriesOptions.find((item: any) => item.value === country)
              ?.label || "All"}
          </SelectTrigger>
          <SelectContent>
            {countriesOptions.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                <span>{item.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>
    );
  };

  const Year: React.FC = () => {
    return (
      <motion.div>
        <p className="mb-2 font-bold text-sm lg:text-base">Năm phát hành</p>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger>
            {yearOptions.find((item: any) => item.value === year)?.label ||
              "All"}
          </SelectTrigger>
          <SelectContent>
            {yearOptions.map((item: any) => (
              <SelectItem key={item.value} value={item.value}>
                <span>{item.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>
    );
  };

  const TypeRaw: React.FC = () => {
    return (
      <motion.div>
        <p className="mb-2 font-bold text-sm lg:text-base">Kiểu phim</p>
        <Select value={typeRaw} onValueChange={setTypeRaw}>
          <SelectTrigger>
            {typeRawOptions.find((item: any) => item.value === typeRaw)
              ?.label || "All"}
          </SelectTrigger>
          <SelectContent>
            {typeRawOptions.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                <span>{item.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>
    );
  };

  const Keyword: React.FC = () => {
    return (
      <Input
        name="input-keyword"
        defaultValue={search}
        key={Math.random() * 36.4621596072}
        placeholder="Nhập kí tự"
        onKeyUp={(e: any) => {
          if (e.code === "Enter") {
            console.info("Pressed Enter");
          }
        }}
        onBlur={handleChangeKeyword}
      />
    );
  };

  const handleChangeKeyword = (e: any) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleResetFilter = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setCategory("");
    setCountry("");
    setTypeRaw("");
    setSearch("");
    setOrderBy("");
    setYear("");
    onFilter({});
  };

  const onSubmit = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const q = {
      category,
      country,
      type: typeRaw,
      status: "",
      year,
      orderBy,
      search: search || "godzilla",
    };
    onFilter(q);
  };

  const Filters: React.FC = () => {
    return (
      <div className="bg-dark/80 backdrop-blur-md z-50 rounded-md">
        {/* <Accordion expanded={expanded} setExpanded={setExpanded}> */}
        {/* <motion.div
          className="bg-hyper-movie text-lg font-bold md:text-xl lg:text-2xl p-3 md:p-5 cursor-pointer flex justify-between items-center"
          onClick={() => setExpanded(true)}
        >
          Lọc Phim
          <TextAlignBottomIcon width={25} height={25} />
        </motion.div> */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 lg:gap-4 items-end p-5">
          <Keyword />
          <OrderBy />
          <TypeRaw />
          <FilmGenres />
          <Countries />
          <Year />
          <Button variant="destructive" onClick={onSubmit}>
            Tìm kiếm
          </Button>
          <Button variant="secondary" onClick={handleResetFilter}>
            Xóa tìm kiếm
          </Button>
        </div>
        {/* </Accordion> */}
      </div>
    );
  };

  return <Filters />;
}
