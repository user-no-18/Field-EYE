export type ExpenseCategory = "Fuel" | "Food" | "Lodging" | "Tolls" | "Misc";

export interface ExpenseData {
  category: ExpenseCategory;
  amount: number;
}

export interface DailyExpense {
  date: string;
  amount: number;
}

export interface WorkerRoute {
  id: string;
  name: string;
  role: string;
  color: string;
  distanceTravelled: string;
  budgetTotal: number;
  budgetSpent: number;
  route: [number, number][];
  expenseCategories: ExpenseData[];
  dailyExpenses: DailyExpense[];
  location: string;
  avatarUrl: string;
  travelHistoryText: string;
  status: "active" | "offline";
}

export const FAKE_WORKERS: WorkerRoute[] = [
  {
    id: "w1",
    name: "Sanjay Roy",
    role: "Field Technician",
    color: "#3b82f6", // Blue
    distanceTravelled: "24 km",
    budgetTotal: 500,
    budgetSpent: 320,
    location: "Kolkata, WB, India",
    avatarUrl: "/avatars/alex.png",
    status: "offline",
    travelHistoryText: "Newtown -> BoroBazar -> Sector 5 -> Sealdah",
    route: [
      [22.5833, 88.4614], // Newtown
      [22.5847, 88.3582], // BoroBazar
      [22.5726, 88.4338], // Sector 5
      [22.6500, 88.4500], // Far North East
    ],
    expenseCategories: [
      { category: "Fuel", amount: 120 },
      { category: "Food", amount: 80 },
      { category: "Lodging", amount: 0 },
      { category: "Tolls", amount: 20 },
      { category: "Misc", amount: 100 },
    ],
    dailyExpenses: [
      { date: "Mon", amount: 50 },
      { date: "Tue", amount: 80 },
      { date: "Wed", amount: 40 },
      { date: "Thu", amount: 100 },
      { date: "Fri", amount: 50 },
    ],
  },
  {
    id: "w2",
    name: "Priya Patel",
    role: "Sales Rep",
    color: "#10b981", // Green
    distanceTravelled: "35 km",
    budgetTotal: 1000,
    budgetSpent: 1100, // Over budget demo
    location: "Kolkata, WB, India",
    avatarUrl: "/avatars/sarah.png",
    status: "active",
    travelHistoryText: "Salt Lake -> Park Street -> Esplanade -> Howrah Station",
    route: [
      [22.5862, 88.4115], // Salt Lake
      [22.5539, 88.3499], // Park Street
      [22.5645, 88.3433], // Esplanade
      [22.4500, 88.3000], // Far South West
    ],
    expenseCategories: [
      { category: "Fuel", amount: 200 },
      { category: "Food", amount: 350 },
      { category: "Lodging", amount: 400 },
      { category: "Tolls", amount: 50 },
      { category: "Misc", amount: 100 },
    ],
    dailyExpenses: [
      { date: "Mon", amount: 200 },
      { date: "Tue", amount: 150 },
      { date: "Wed", amount: 300 },
      { date: "Thu", amount: 250 },
      { date: "Fri", amount: 200 },
    ],
  },
  {
    id: "w3",
    name: "Amit Sharma",
    role: "Delivery Driver",
    color: "#f59e0b", // Amber
    distanceTravelled: "45 km",
    budgetTotal: 800,
    budgetSpent: 450,
    location: "Kolkata, WB, India",
    avatarUrl: "/avatars/michael.png",
    status: "active",
    travelHistoryText: "Jadavpur -> Gariahat -> Ballygunge -> Rabindra Sadan",
    route: [
      [22.4986, 88.3636], // Jadavpur
      [22.5186, 88.3639], // Gariahat
      [22.5273, 88.3644], // Ballygunge
      [22.5000, 88.4500], // South East
    ],
    expenseCategories: [
      { category: "Fuel", amount: 300 },
      { category: "Food", amount: 100 },
      { category: "Lodging", amount: 0 },
      { category: "Tolls", amount: 50 },
      { category: "Misc", amount: 0 },
    ],
    dailyExpenses: [
      { date: "Mon", amount: 100 },
      { date: "Tue", amount: 80 },
      { date: "Wed", amount: 120 },
      { date: "Thu", amount: 90 },
      { date: "Fri", amount: 60 },
    ],
  },
  {
    id: "w4",
    name: "Rahul Das",
    role: "Regional Manager",
    color: "#8b5cf6", // Purple
    distanceTravelled: "15 km",
    budgetTotal: 1500,
    budgetSpent: 1250,
    location: "Kolkata, WB, India",
    avatarUrl: "/avatars/emma.png",
    status: "active",
    travelHistoryText: "Dum Dum -> Shyambazar -> College Street",
    route: [
      [22.6224, 88.4282], // Dum Dum
      [22.6015, 88.3742], // Shyambazar
      [22.6000, 88.3000], // North West
    ],
    expenseCategories: [
      { category: "Fuel", amount: 150 },
      { category: "Food", amount: 400 },
      { category: "Lodging", amount: 600 },
      { category: "Tolls", amount: 50 },
      { category: "Misc", amount: 50 },
    ],
    dailyExpenses: [
      { date: "Mon", amount: 200 },
      { date: "Tue", amount: 300 },
      { date: "Wed", amount: 150 },
      { date: "Thu", amount: 400 },
      { date: "Fri", amount: 200 },
    ],
  }
];
