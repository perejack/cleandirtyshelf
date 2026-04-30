import cleaner from "@/assets/role-cleaner.jpg";
import guard from "@/assets/role-guard.jpg";
import sales from "@/assets/role-sales.jpg";
import reception from "@/assets/role-reception.jpg";
import storekeeper from "@/assets/role-storekeeper.jpg";
import marketer from "@/assets/role-marketer.jpg";
import driver from "@/assets/role-driver.jpg";
import cashier from "@/assets/role-cashier.jpg";
import loader from "@/assets/role-loader.jpg";
import supervisor from "@/assets/role-supervisor.jpg";
import chef from "@/assets/role-chef.jpg";

export type Job = {
  id: string;
  category: string;
  title: string;
  emoji: string;
  description: string;
  salary: number;
  allowance: number;
  image: string;
};

export const JOBS: Job[] = [
  { id: "cleaner", category: "Operations", title: "Cleaner", emoji: "🧹", description: "Maintain cleanliness and hygiene standards across the store", salary: 22400, allowance: 500, image: cleaner },
  { id: "guard", category: "Security", title: "Guard", emoji: "🛡️", description: "Ensure safety and security of premises and customers", salary: 27000, allowance: 700, image: guard },
  { id: "sales", category: "Sales", title: "Sales Attendant", emoji: "🛒", description: "Assist customers and manage product displays", salary: 25000, allowance: 500, image: sales },
  { id: "reception", category: "Administration", title: "Receptionist", emoji: "📞", description: "Front desk management and customer service", salary: 34000, allowance: 3000, image: reception },
  { id: "storekeeper", category: "Inventory", title: "Store Keeper", emoji: "📦", description: "Manage stock inventory and storage organization", salary: 22000, allowance: 500, image: storekeeper },
  { id: "marketer", category: "Marketing", title: "Distributor & Marketer", emoji: "📊", description: "Product distribution and marketing activities", salary: 29000, allowance: 1500, image: marketer },
  { id: "driver", category: "Logistics", title: "Driver", emoji: "🚛", description: "Transport goods and ensure timely deliveries", salary: 27400, allowance: 2500, image: driver },
  { id: "cashier", category: "Finance", title: "Accountant & Cashier", emoji: "💰", description: "Handle financial transactions and bookkeeping", salary: 32000, allowance: 3000, image: cashier },
  { id: "loader", category: "Warehouse", title: "Loader & Off-loader", emoji: "💪", description: "Loading and unloading of goods and merchandise", salary: 17000, allowance: 500, image: loader },
  { id: "supervisor", category: "Management", title: "Warehouse Supervisor", emoji: "📋", description: "Oversee warehouse operations and staff", salary: 31000, allowance: 2000, image: supervisor },
  { id: "chef", category: "Food Services", title: "Chef", emoji: "👨‍🍳", description: "Prepare quality meals for staff and customers", salary: 23750, allowance: 1500, image: chef },
];

export const LOCATIONS = [
  "Nairobi - CBD", "Nairobi - Westlands", "Nairobi - Karen", "Nairobi - Eastleigh",
  "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Nyeri", "Machakos", "Kakamega",
];

export const EDUCATION = [
  "KCPE", "KCSE", "Certificate", "Diploma", "Bachelor's Degree", "Master's Degree",
];

export const START_OPTIONS = [
  { value: "immediate", label: "Immediately" },
  { value: "2weeks", label: "Within 2 weeks" },
  { value: "1month", label: "Within 1 month" },
  { value: "more", label: "More than 1 month" },
];
