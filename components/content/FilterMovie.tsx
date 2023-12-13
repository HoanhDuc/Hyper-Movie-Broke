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
import Accordion from "../ui/accordion";
import { TextAlignBottomIcon } from "@radix-ui/react-icons";

export default function FilterMovie({
  onFilter,
}: {
  onFilter: (q: any) => void;
}) {
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [filmGenres, setFilmGenres] = useState("");
  const [countries, setCountries] = useState("");
  const [typeRaw, setTypeRaw] = useState("");
  const [year, setYear] = useState("");

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
        <Select value={filmGenres} onValueChange={setFilmGenres}>
          <SelectTrigger>
            {filmGenresOptions.find((item: any) => item.value === filmGenres)
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
        <Select value={countries} onValueChange={setCountries}>
          <SelectTrigger>
            {countriesOptions.find((item: any) => item.value === countries)
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
        defaultValue={keyword}
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
    setKeyword(e.target.value);
  };

  const handleResetFilter = () => {
    window.scrollTo({
      top: window.innerHeight - 100,
      behavior: "smooth",
    });
    setFilmGenres("");
    setCountries("");
    setTypeRaw("");
    setKeyword("");
    setOrderBy("");
    setYear("");
    onFilter({});
  };

  const onSubmit = () => {
    window.scrollTo({
      top: window.innerHeight - 100,
      behavior: "smooth",
    });
    const q = {
      categoryId: filmGenres,
      countryId: countries,
      typeRaw: typeRaw,
      statusRaw: "",
      year: year,
      orderBy: orderBy,
      search: keyword,
    };
    onFilter(q);
  };

  const Filters: React.FC = () => {
    return (
      <div className="container mx-auto z-50 bg-[#09090b] py-5">
        <motion.div className="text-lg font-bold md:text-xl lg:text-2xl bg-hyper-movie p-3 md:p-5 rounded-t-md cursor-pointer flex justify-between items-center">
          Bộ Lọc Hyper Movie
          <TextAlignBottomIcon width={25} height={25} />
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 lg:gap-4 items-end p-5 border-2 border-t-0 border-hyper-movie rounded-b-lg">
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
      </div>
    );
  };

  return <Filters />;
}
