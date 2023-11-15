"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  countriesOptions,
  filmGenresOptions,
  orderByOptions,
  typeRawOptions,
} from "@/constants/filter";
import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
        <p className="mb-2 text-sm font-bold">Order by:</p>
        <Select value={orderBy} onValueChange={setOrderBy}>
          <SelectTrigger>{orderBy || "All"}</SelectTrigger>
          <SelectContent>
            {orderByOptions.map((item) => (
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
        <p className="mb-2 text-sm font-bold">Film Genres:</p>
        <Select value={filmGenres} onValueChange={setFilmGenres}>
          <SelectTrigger>{filmGenres || "All"}</SelectTrigger>
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
        <p className="mb-2 text-sm font-bold">Countries:</p>
        <Select value={countries} onValueChange={setCountries}>
          <SelectTrigger>{countries || "All"}</SelectTrigger>
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
        <p className="mb-2 text-sm font-bold">Year:</p>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger>{year || "All"}</SelectTrigger>
          <SelectContent>
            {orderByOptions.map((item) => (
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
        <p className="mb-2 text-sm font-bold">Type Raw:</p>
        <Select value={typeRaw} onValueChange={setTypeRaw}>
          <SelectTrigger>{typeRaw || "All"}</SelectTrigger>
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
        autoFocus
        value={keyword}
        placeholder="Give me keyword"
        onChange={handleChangeKeyword}
      />
    );
  };

  const handleChangeKeyword = (e: any) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };

  const handleResetFilter = () => {
    setFilmGenres("");
    setCountries("");
    setTypeRaw("");
    setKeyword("");
    setOrderBy("");
    setYear("")
    onSubmit();
  };

  const onSubmit = () => {
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
      <div className="container mx-auto">
        <motion.h2 className="text-lg font-bold md:text-xl lg:text-2xl mb-3">
          Filters Movie
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 lg:gap-4 items-end">
          <Keyword />
          <OrderBy />
          <TypeRaw />
          <FilmGenres />
          <Countries />
          <Year />
          <Button variant="destructive" onClick={onSubmit}>
            Filter now
          </Button>
          <Button variant="secondary" onClick={handleResetFilter}>
            Clear Filter
          </Button>
        </div>
      </div>
    );
  };

  return <Filters />;
}
