import MenuCard from "@/components/MenuCard";
// data/menuItems.ts
const menuItems = [
  {
    id: "1",
    title: "ကြက်သားကြော်ဘားဂါ",
    description: "ချဉ်စပ်တဲ့ မျက်နှာသစ်သီးနဲ့ ကြက်သားကြော်တင်ထားသည်။",
    price: "MMK 3,200",
    imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
  },
  {
    id: "2",
    title: "ငါးကင်အထုပ်",
    description:
      "ငါးကင်ပြင်ဆင်ထားပြီး ဆန်ပဲနှင့် ဟင်းသီးဟင်းရွက်ဖြင့်တစ်ဆက်တည်းပေးသည်။",
    price: "MMK 4,000",
    imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
  },
  {
    id: "3",
    title: "ဟင်းသီးဟင်းရွက်ပါ ဂျိမ်းပါ",
    description: "သန့်ရှင်းပြီး ဟင်းသီးဟင်းရွက်များနဲ့ ချီဇ်ပါသော ပီဇာ။",
    price: "MMK 5,500",
    imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
  },
  {
    id: "4",
    title: "အမဲသားစတိတ်",
    description:
      "နူးညံ့သော အမဲသားစတိတ်၊ မက်ရှ်ပေတိတ်နှင့် ဟင်းသီးဟင်းရွက်အပြည့်အစုံနှင့်ပေးသည်။",
    price: "MMK 6,800",
    imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
  },
  {
    id: "5",
    title: "တိုဖူးဆလတ်",
    description:
      "တိုဖူးကြော်နှင့် သရေစာဆီအညှာဖြင့် ပြုလုပ်ထားသော ပြောင်းပြန်နှစ်သက်ဖွယ်ဆလတ်။",
    price: "MMK 2,500",
    imageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7",
  },
  {
    id: "6",
    title: "မုန့်ဟင်းခါး",
    description:
      "မြန်မာ့ရိုးရာ ဟင်းခါး၊ ကြက်သွန်နီ၊ ငါးဆီနှင့် ဟင်းနုန့်များပါဝင်သည်။",
    price: "MMK 1,200",
    imageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7",
  },
  {
    id: "7",
    title: "ထန်းလျှော်",
    description:
      "ထန်းနွယ်များ၊ နွားနို့နှင့်ချိုမြိန်သော မြန်မာ့ရိုးရာထမင်းဟင်း။",
    price: "MMK 1,500",
    imageUrl: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0",
  },
  {
    id: "8",
    title: "သံပုရာချဉ်",
    description: "သံပုရာနှင့် ချဉ်စပ်သော မြန်မာ့ရိုးရာ ဟင်းလျာ။",
    price: "MMK 1,300",
    imageUrl: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0",
  },
];

export default function Menu({ params }) {
  const { canteenId } = params;
  const dummy = true;

  return (
    <div className="">
      {dummy ? (
        <div>
          Menu {canteenId}
          <div className="w-5/6 mx-auto grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-8">
            {menuItems.map((item) => (
              <MenuCard key={item.id} {...item} canteenId={canteenId} />
            ))}
          </div>
        </div>
      ) : (
        <div> </div>
      )}
    </div>
  );
}
