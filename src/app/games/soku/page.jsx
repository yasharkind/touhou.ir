"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";

class Tab {
  title;
  element;
  index;

  constructor(title, element, index) {
    this.title = title;
    this.element = element;
    this.index = index;
  }
}

const Intro = () => {
  let _v = new Tab(
    "معرفی",
    <div dir="rtl" className="text-[18px] lg:text-[24px] koodak dejavu">
      <p>
        <span className="text-7">
          «توهو ناآگاه از قانون طبیعت ~ در پیِ معمایِ عروسکِ غول‌پیکرِ مضحک»
        </span>{" "}
        یا در کوتاه همان توهو هیسوتنسوکو یا توهو سوکو, بازی فایتر در سری بازی
        های فرعی پروژه توهو هست و بخاطر گیم پلی خاص خود طرفدار هایی پیدا کرده
        است.
      </p>
      <br />
      <p>
        سازنده های این بازی twilight frontier و team Shanghai alice هستند و ورژن
        کامل این بازی در کامیکت ۷۶ در اگوست ۱۵ سال ۲۰۰۹ عرضه شد
      </p>
      <br />
      <center>
        <a href="https://c778454.parspack.net/Touhou 12.3 - Hisoutensoku - lan.7z">
          <button className="bg-4 p-4 border-[black] rounded-2xl text-2">
            دانلود بازی
            <br />
            <span className="text-sm">Windows/Linux(wine)</span>
          </button>
        </a>
        <video
          className="rounded-4xl h-90 mt-6 shadow-[0px_0px_50px_10px] shadow-7 border-[2px] border-2"
          src="/sokupage/game1.webm"
          autoPlay
          loop
        />
      </center>
    </div>,
    0,
  );
  return _v;
};
const GamePlay = () => {
  const tabs = [
    new Tab(
      "گریزینگ",
      <>
        <br />
        <p>
          {" "}
          وقتی شخصیتت در حالت دش یا پرواز است، وارد حالت{" "}
          <span className="text-7">گریزینگ</span> می‌شه, در این حالت: می‌تونی از
          داخل پروجکتایل های حریف رد بشی بدون اینکه دمیج بخوری.
        </p>
        <br />
        <p>
          اما از حملات نزدیک (میلی) نمی‌تونی رد بشی و اونا هنوز می‌تونن بهت ضربه
          بزنن.
        </p>
        <br />
        <h5 className="text-7">یعنی عملاً:</h5>
        <br />
        <li>پروجکتایل ها: قابل گریز</li>
        <li>میلی: غیرقابل گریز</li>
        <br />
        <p>
          در ذهن داشته باشید که در هوا فقط ۲ بار میتونید از دکمه دش یا همان
          گریزینگ استفاده کنید.
        </p>
      </>,
      0,
    ),
    new Tab(
      "میلی اتک",
      <>
        <br />
        <p>
          به حمله هایی که شخصیتت از نزدیک میزنه رو میلی اتک میگویند، میلی اتک
          برای شروع کردن کومبو، ایجاد فشار و مجازات گریز بسیار خوب هستند ولی در
          برابر پروجکتایل ها میبازند
        </p>
      </>,
      1,
    ),
    new Tab(
      "پروجکتایل",
      <>
        <br />
        <p>
          به دانماکو هایی که شخصیتت روی صفحه میندازه پروجکتایل میگویند و در جنگ
          های دور و تنبیه کردن میلی اتک کاربرد داره ، ولی پروجکتایل ها در برابر
          گریزینگ میبازند چونکه گریزینگ از توی پروجکتایل ها رد میشه.
        </p>
        <br />
        <p>
          در خلاصه , گریزینگ از میلی میبازه ، میلی از پروجکتایل میبازه و
          پروجکتایل از گریزینگ میبازه.
        </p>
      </>,
      2,
    ),
    new Tab(
      "دفاع",
      <>
        <br />
        <p>
          دفاع در توهو سوکو بسیار موضوع گسترده ای است که در ادامه به آن
          میپردازیم:
        </p>
        <p>دو نوع گارد وجود دارد:</p>
        <br />
        <ol className="list-decimal mr-2.5">
          <li className="text-7 text-[16px] lg:text-[24px]">
            دفاع های (High Block)
            <p className="text-2">
              با نگه داشتن دکمهی سمت مخالف دشمن انجام می‌شود. همه حملات بالا و
              مستقیم را بلاک می‌کند. حملات لو را نمی‌گیرد.
            </p>
          </li>
          <br />
          <li className="text-7 text-[16px] lg:text-[24px]">
            دفاع لو (Low Block)
          </li>
          <p>با نگه داشتن دکمه مخالف جهت دشمن و دکمه پایین انجام می‌شود.</p>
          <div className="text-2">
            <li className="list-disc">حملات لو را بلاک می‌کند.</li>
            <li className="list-disc">حملات های را نمی‌گیرد.</li>
            <p className="text-7">
              نکته مهم : در هنگام گریزینگ نمیتوانید دفاع کنید!
            </p>
            وقتی در هوا باشی می‌توانید گارد بگیری (برخلاف بسیاری از فایتینگ‌ها).
            اما:
            <br />
            <p>
              فقط پروجکتایل ها و حمله های میلی هوایی را در هوا می‌توانید بلاک
              کنی. حملات میلی که از روی زمین زده میشوند در هوا غیرقابل بلاک
              هستند.
            </p>
          </div>
        </ol>
      </>,
      3,
    ),
    new Tab(
      "گارد کراش",
      <>
        <br />
        <p>گارد کراش حالتی است که در آن</p>
        <ul className="text-7">
          <li>نمی‌توانی بلاک کنی</li>
          <li>یک مدت کوتاه استان می‌شوی</li>
          <li>حریف می‌تواند کامبو آزاد بزند</li>
        </ul>
        <p>
          در صورتی در این حالت قرار میگیرید که تمام اسپیریت اورب هاتون مصرف بشه
        </p>
      </>,
      4,
    ),
    new Tab(
      "اسپیریت اورب",
      <>
        <br />
        <p>
          در پایین صفحه چند ۶ ضلعی آبی وجود دارد ، اینها اسپیریت اورب های شما
          هستند و از انها در : پرواز کردن ، دفاع کردن و فرستادن پروجکتایل ها
          استفاده میشود
        </p>
      </>,
      5,
    ),
  ];

  const params = useSearchParams();
  const subtab = params.get("subtab");
  const [tab, setTab] = useState(
    subtab > 0 && subtab <= tabs.length ? subtab - 1 : 0,
  );

  let _v = new Tab(
    "گیم پلی",
    <div
      dir="rtl"
      className="text-sm lg:text-2xl koodak h-full flex flex-col gap-4"
    >
      <p>
        توهو سوکو ، بر خلاف بیشتر بازی های پروژه توهو یک بازی بولت هل نیست بلکه
        یک بازی فایتر است!
      </p>
      <p>
        در توهو سوکو 7 چیز خیلی مهم هست که باید آنها را بدانید ، این 7 چیز
        عبارتند از:
      </p>
      <div
        className="text-xs rounded-lg gap-4 flex flex-wrap"
        style={{
          background: "url(/sokupage/tabbar.jpg)",
          backgroundSize: "cover",
        }}
      >
        <TabBar tabs={tabs} current={tab} action={setTab} param="subtab" />
      </div>
      <div className="h-full">{tabs[tab].element}</div>
    </div>,

    1,
  );
  return _v;
};

const Deck = () => {
  const tabs = [
    new Tab(
      "اسپل کارت ها",
      <>
        <br />
        <p>
          اسپل کارت ها، کارتی خیلی قوی هستند که بین ۱ تا ۵ کارت دیگر را هم مصرف
          میکنند و بیشتر آنها فضای بزرگی از صفحه را پر میکنند، باید وقتی از آنها
          استفاده کرد که حریف قابلیت گریز یا دفاع را نداشته باشد تا از پتانسیل
          کاملش بهره برد.
        </p>
      </>,
      0,
    ),
    new Tab(
      "اسکیل کارت ها",
      <>
        <br />
        <p>این‌ها برای جایگزینی یا آپگرید اسکیل های پایه شخصیتت هستند.</p>
        <br />
        <p>
          مثلا در پیش‌فرض اگر دو بار دکمه پایین را با کوماچی فشار دهید و سپس
          دکمه پروجکتایل ها را بزنید ، کوماچی تلپورت میکند ، ولی اگر از یک اسکیل
          کارت دیگر قبل ان استفاده کنید ، بجای اینکه کوماچی تلپورت کند ، او کاری
          را انجام میدهد که آن اسکیل کارت انجام میدهد , همینطور اگر چند بار از
          یک اسکیل کارت استفاده کنید آن اسکیل کارت اپگرید میشود و بهتر میشود.
        </p>
      </>,
      1,
    ),
    new Tab(
      "سیستم کارت ها",
      <>
        <br />
        <p>
          سیستم کارت ها شامل چندین کارت هستند که بین همه کارکتر ها مشترک است و
          استفاده های مختلفی دارند.
        </p>
        <br />
        <p>
          توجه داشته باشید که هر دک پلی استایل مختلف خود را دارد و بهتر است با
          انها آزمایش کنید.
        </p>
      </>,
      2,
    ),
    new Tab(
      "روش به دست اوردن کارت ها",
      <>
        <br />
        <p>
          اگر دمیج بگیرید یا دمیج به حریف بزنید ، نوار کارت پایین پر میشود و
          وقتی پر شود یک کارت به دسته کارت شما اضافه میشود ، توجه داشته باشید که
          تنها ۵ کارت می‌توانید در دست خود داشته باشید.
        </p>
      </>,
      3,
    ),
  ];

  const params = useSearchParams();
  const subtab = params.get("subtab");
  const [tab, setTab] = useState(
    subtab > 0 && subtab <= tabs.length ? subtab - 1 : 0,
  );

  const _v = new Tab(
    "دک کارت ها",
    <div dir="rtl" className="text-2xl">
      <br />
      <p>بازیکن قبل شروع بازی یک دک کارت را میسازد و انتخاب میکند.</p>
      <br />
      <p>
        دک کارت یعنی مجموعه‌ای از کارت‌هایی است که تعیین می‌کند که در مبارزه:
      </p>
      <br />
      <ul className="text-7">
        <li>چه اسپل کارت هایی(حرکات ویژه/فینیشر) داری</li>
        <li>
          چه اسکیل کارت هایی (مهارت‌های جایگزین برای اسکیل‌های پیشفرض) داری
        </li>
        <li>چه سیستم کارت هایی(کارت های عمومی همه کارکتر ها) داری</li>
      </ul>
      <br />
      <p>
        به صورت پیش‌فرض اندازه دک ۲۰ کارت است و هر کارکتر اسپل و اسکیل کارت های
        مخصوص خود را دارد ، توجه داشته باشید که از هر کارت میتوان تعداد محدودی
        برداشت.
      </p>
      <br />
      <div
        className="text-[10px] flex flex-wrap gap-4 rounded-4xl"
        style={{
          backgroundImage: "url(/sokupage/tabbar.jpg)",
          backgroundSize: "cover",
        }}
      >
        <TabBar tabs={tabs} current={tab} action={setTab} param="subtab" />
      </div>
      <div className="h-full">{tabs[tab].element}</div>
    </div>,
    2,
  );

  return _v;
};

const Weather = () => {
  const tabs = [
    new Tab(
      "Sunny",
      <>
        <br />
        <li>هزینه اسپیریت اورب برای ایر دش و پرواز کردن نصف میشه.</li>
      </>,
      0,
    ),
    new Tab(
      "Drizzle",
      <>
        <br />
        <li>۲۵٪ دمیج اسپل کارد ها بیشتر میشه</li>
      </>,
      1,
    ),
    new Tab(
      "Cloudy",
      <>
        <br />
        <li>هزینه اسپل کارد یکدونه کمتر و کارد گین سریع تر.</li>
      </>,
      2,
    ),
    new Tab(
      "Bluesky",
      <>
        <br />
        <li>
          اسکیل های بولت رو میشه ویف کنسل کرد و هر اسکیل آن هیز رو میشه کنسل کرد
          به اسکیل های دیگه (تکراری نمیشه)
        </li>
      </>,
      3,
    ),
    new Tab(
      "Hail",
      <>
        <br />
        <ul>
          <li>۲۵٪ دمیج اسکیل ها بیشتر </li>
          <li>دو برابر اسپیریت ریکاوری</li>
        </ul>
      </>,
      4,
    ),
    new Tab(
      "Spring Haze",
      <>
        <br />
        <li>میتونید از میلی اتک ها گریز کنید (دش کنید).</li>
      </>,
      5,
    ),
    new Tab(
      "Heavy Fog",
      <>
        <br />
        <li>۵۰٪ دمیج به دشمن تبدیل به جون میشه.</li>
      </>,
      6,
    ),
    new Tab(
      "Snow",
      <>
        <br />
        <li>وقتی هیت میخورید کارت هارو آروم آروم از دست میدید.</li>
      </>,
      7,
    ),
    new Tab(
      "Sun Shower",
      <>
        <br />
        <li>
          اگه اشتباه بلاک کنید گارد کراش میشید. ولی اسپیریت اورب از دست نمیدید.
        </li>
      </>,
      8,
    ),
    new Tab(
      "Sprinkle",
      <>
        <br />
        <li>همه‌ی اسکیل ها لول ۴ (max) میشن.</li>
      </>,
      9,
    ),
    new Tab(
      "Tempest",
      <>
        <br />
        <li>دش و پرواز خیلی سریع تر.</li>
      </>,
      10,
    ),
    new Tab(
      "Mountain Vapor",
      <>
        <br />
        <li>اسپل کارت های دست شما مخفی میشن.</li>
      </>,
      11,
    ),
    new Tab(
      "River Mist",
      <>
        <br />
        <li>رندوم به عقب و جلو میرید.</li>
      </>,
      12,
    ),
    new Tab(
      "Typhoon",
      <>
        <br />
        <li>هیت استان و ناکبک وجود نداره</li>
        <li>نمیشه بلاک کرد.</li>
      </>,
      13,
    ),
    new Tab(
      "Calm",
      <>
        <br />
        <li>هرکی آخرین هیت رو زده باشه نورانی میشه و جونش پر میشه.</li>
      </>,
      14,
    ),
    new Tab(
      "Diamond Dust",
      <>
        <br />
        <li>نمیشه تک کرد.</li>
        <li>ناک داون دمیج بیشتر نمیده.</li>
      </>,
      15,
    ),
    new Tab(
      "Dust Strom",
      <>
        <br />
        <li>همه ی هیت ها کاونترهیت میشن.</li>
      </>,
      16,
    ),
    new Tab(
      "Scorching Sun",
      <>
        <br />
        <li>هرچقدر بالا تر میرید (نزدیک به خورشید) دیمیج بیشتر میخورید.</li>
        <li>تا ۳۵٪.</li>
      </>,
      17,
    ),
    new Tab(
      "Monsoon",
      <>
        <br />
        <li>دشمن هنگام کمبو شدن باونس میشه و کمبو کردن راحت تر میشه.</li>
      </>,
      18,
    ),
    new Tab(
      "Aurora",
      <>
        <br />
        <li>یکی از ۱۹ افکت به صورته رندوم.</li>
        <li>باید تشخیص بدید کدوم افکت هست.</li>
      </>,
      19,
    ),
  ];
  const params = useSearchParams();
  const subtab = params.get("subtab");
  const [tab, setTab] = useState(
    subtab > 0 && subtab <= tabs.length ? subtab - 1 : 0,
  );

  const _v = new Tab(
    "آب و هوا",
    <div dir="rtl" className="text-[18px] lg:text-[24px]">
      <h3>در این بخش سیستم آب و هوا رو توضیح میدهیم.</h3>
      <br />
      <p>
        در طول یک مچ آب و هوا تغییر میکند و هر آب و هوا تاثییر مخصوص خودش را
        دارد.
      </p>
      <p>اولین ودر به صورت رندم انتخاب میشود ولی ودر های بعدی به ترتیب زیر</p>
      <br />
      <div
        dir="ltr"
        className="text-[10px] gap-4 flex shrink-0 grow-0 flex-wrap rounded-4xl"
        style={{
          backgroundImage: "url(/sokupage/tabbar.jpg)",
          backgroundSize: "cover",
        }}
      >
        <TabBar tabs={tabs} current={tab} action={setTab} param="subtab" />
      </div>
      <div className="h-full text-7">{tabs[tab].element}</div>
    </div>,
    3,
  );

  return _v;
};

const Online = () => {
  const _v = new Tab(
    "آنلاین",
    <div dir="rtl" className="text-[18px] lg:text-[24px]">
      <h3>چگونه آنلاین بازی کنیم؟</h3>
      <br />
      <p className="text-red-300">
        توجه! این فقط به پلیر های داخل ایران صدق میکند.
      </p>
      <br />
      <p>
        بعد اینکه بازی را باز کردید ، دکمه ای که صفحه ماد ها را باز میکند (سمت
        راست بالا) را بزنید و دنبال ماد game host list باشید و آن را خاموش کنید
        و سپس بازی را ببندید و سپس دوباره باز کنید ، سپس به قسمت نتوورک مراجعه
        فرمایید
      </p>
      <br />
      <h4>در صورتی که قصد ساخت سرور دارید:</h4>
      <br />
      <p>
        آی پی خود را از برنامه ای مثل packet raft یا dota iran connect بگیرید
        ،گزینه اول را انتخاب کنید و دکمه accept را بزنید و آی پی خود را به شخص
        مورد نظر بدهید.
      </p>
      <br />
      <h4>در صورتی که قصد وصل شدن به سرور دارید:</h4>
      <br />
      <p>
        همان برنامه ای که شخص مورد نظر برای گرفتن ای پی روشن کرد، شما نیز روشن
        نمایید و سپس گزینه دوم را در صفحه نتوورک انتخاب کنید و آی پی شخص مورد
        نظر را وارد کنید، <span className="text-red-300">توجه:</span> به پورت
        دست نزنید
      </p>
      <p>
        <span className="text-red-300">توجه: </span> اگر آی پی شخص دو رقمی یا سه
        رقمی بود، به جای رقم سوم صفر بگذارید مثلا : ۱۰.۸۷ --&gt; ۰۱۰.۰۸۷
      </p>
    </div>,
    4,
  );
  return _v;
};

const TabBar = ({ tabs, current, action, param }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return tabs.map((t, i) => {
    return (
      <button
        key={i}
        onClick={() => {
          action(t.index);
          if (param) {
            const params = new URLSearchParams(searchParams);
            params.set(param, t.index + 1);
            router.replace(`?${params.toString()}`);
          }
        }}
        className={`rounded-4xl ${current === t.index ? "bg-3" : ""}`}
      >
        <h2 className="self-center active:bg-7 active:scale-125 text-2 text-shadow-3 text-shadow-lg transition dejavu koodak text-[14px] lg:text-[20px] rounded-4xl border-l-1 border-t-2 border-r-3 border-b-4 shadow-lg shadow-3 bg-[#00000044] border p-4">
          {t.title}
        </h2>
      </button>
    );
  });
};

function SokuBody() {
  const tabs = [Intro(), GamePlay(), Deck(), Weather(), Online()];
  const params = useSearchParams();
  const tabParam = params.get("tab");
  const [tab, setTab] = useState(
    tabParam <= tabs.length && tabParam > 0 ? tabParam - 1 : 0,
  );
  return (
    <div className="overflow-y-auto w-[99%] h-[99%] bg-linear-to-b from-[#111111] to-[#ffffff] m-auto rounded-4xl self-center flex flex-col-reverse">
      <div className="basis-5/6 bg-3 rounded-b-4xl m-2.5 mt-0 p-8">
        {tabs[tab].element}
      </div>
      <div
        dir="rtl"
        style={{
          backgroundSize: "cover",
          backgroundImage: "url(/sokupage/tabbar.jpg)",
        }}
        className="basis-1/12 m-2.5 mb-0 rounded-t-4xl p-5 lg:space-x-4"
      >
        <TabBar tabs={tabs} current={tab} action={setTab} param="tab" />
      </div>
      <center>
        <h1
          className="dejavu koodak color-3 mt-2.5 text-[24px] lg:mt-6"
          dir="rtl"
        >
          دانلود و آموزش بازی Soku آنلاین
        </h1>
      </center>
    </div>
  );
}

export default function SokuPage() {
  return (
      <div className="scheme-soku h-dvh w-dvw bg-2 flex">
        <span className="absolute inline w-full  pointer-events-none">
          <Image
            src="/sokupage/gear1.webp"
            className="inline animate-[gear_15s_linear_infinite] -translate-48 scale-125"
          />
          <Image
            src="/sokupage/gear2.webp"
            className="inline [animation-direction:reverse] animate-[gear_7.5s_linear_infinite] -translate-33.5 scale-125"
          />
          <Image
            src="/sokupage/gear3.webp"
            className="inline animate-[gear_7.5s_linear_infinite] scale-150 translate-x-10 -translate-y-10 right-0 absolute"
          />
        </span>
	  <Suspense>
        <SokuBody />
	  </Suspense>
      </div>
  );
};
