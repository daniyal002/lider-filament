interface Props {
  nameProduct: string;
  setNameProduct: (name:string) => void;
  minPrice: number;
  setMinPrice: (minPrice:number) => void;
  maxPrice: number;
  setMaxPrice: (maxPrice:number) => void;
  resetFilters: () => void;
}

export default function FilterSection({
  nameProduct,
  setNameProduct,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  resetFilters,
}:Props) {
  return (
    <section className="shop-widget filter-widget bg-grey" style={{
        background: "rgba(134, 155, 223, 0.14)",
        border: "1px solid #efefef",
        padding: "36px 38px 48px 30px",
      }}>
      <h2
        style={{
          background: "linear-gradient(297deg, #9CD0FF, #A95BF3, #9CD0FF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Фильтр
      </h2>
      <div
        className="search-range"
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <span className="sub-title" style={{ margin: "0", color: "#fff" }}>
          Название товара
        </span>
        <input
          type="text"
          value={nameProduct || ""}
          onChange={(e) => setNameProduct(e.target.value)}
          className="form-control"
          placeholder="Название товара"
        />
        <span className="sub-title" style={{ margin: "0", color: "#fff" }}>
          Цена
        </span>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setMinPrice(Number(value));
            }
          }}
          min="0"
          className="form-control"
          placeholder="От"
        />
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setMaxPrice(Number(value));
            }
          }}
          max="10000"
          className="form-control"
          placeholder="До"
        />
        <button onClick={resetFilters}>Сбросить Фильтр</button>
      </div>
    </section>
  );
}
