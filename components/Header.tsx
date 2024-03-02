"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppContext } from "@/context/AppContext";

const Header = () => {
  // Accessing context values
  const { perPage, setPerPage, searchTerm, setSearchTerm, sortBy, setSortBy } =
    useAppContext();

  // Handler for changing the number of items per page
  const handleRowCountChange = (newValue: string) => {
    setPerPage(+newValue);
  };

  // Handler for changing the search term
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handler for changing the sorting option
  const handleSortChange = (newValue: string) => {
    setSortBy(newValue);
  };

  return (
    <div className="p-4 flex w-full items-center md:justify-between max-md:flex-col">
      {/* Title */}
      <h1 className="text-2xl  text-center text-gray-400 font-bold sm:px-6 lg:px-8">
        Today's Appointment List
      </h1>

      <div className="ml-auto max-md:w-full max-md:mx-auto">
        <div className="flex justify-center space-x-4 w-full my-4 gap-4 max-md:flex-wrap">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by patient name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 p-2 rounded-md"
          />

          {/* Sort By Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Sort By</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={sortBy?.toString()}
                onValueChange={handleSortChange}
              >
                <DropdownMenuRadioItem value="patient_name">
                  Patient Name
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="appointment_date">
                  Appointment Date
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="mobile_number">
                  Mobile Number
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="doctor">
                  Doctor
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="injury">
                  Injury
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Display Dropdown for Number of List Items */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Display</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Number Of Appointments</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={perPage.toString()}
                onValueChange={handleRowCountChange}
              >
                <DropdownMenuRadioItem value="5">5</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="10">10</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="15">15</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;
