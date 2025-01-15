function Nutrition ({ label, unit, quantity }) {
    return (
        <p className="nutritionFacts"><b>{label}</b> - {quantity.toFixed(2)} {unit}</p>
    )
}
export default Nutrition;