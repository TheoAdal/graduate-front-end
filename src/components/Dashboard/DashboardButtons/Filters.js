return (
    <div className="filters__container">
      <FormControl>
        <Select
          sx={{ mb: "10px" }}
          className="filters__item"
          value={storedFilters.price ? storedFilters.price : price ? price : 0}
          name="Price"
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          onChange={handleChange}
        >
          <MenuItem value={0}>{`Price`}</MenuItem>
          {priceRange}
        </Select>
      </FormControl>
      <Select
        className="filters__item"
        value={storedFilters.size ? storedFilters.size : size ? size : 0}
        name="Size"
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        onChange={handleChange}
      >
        <MenuItem value={0}>{`Size`}</MenuItem>
        {sizeRange}
      </Select>
      <Select
        className="filters__item"
        value={
          storedFilters.bedrooms
            ? storedFilters.bedrooms
            : bedrooms
            ? bedrooms
            : 0
        }
        name="Bedrooms"
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        onChange={handleChange}
      >
        <MenuItem value={0}>{`Bedrooms`}</MenuItem>
        {bedroomRange}
      </Select>
    </div>
  );
}

export default Filters;