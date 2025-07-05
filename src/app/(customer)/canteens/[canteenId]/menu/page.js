import MenuCard from "@/components/MenuCard";

export default  function Menu({params}){
    const {canteenId} = params;
    return (
        <div>
            Menu {canteenId}
            <MenuCard/>
        </div>
    )
}