
import { Meta, StoryObj } from '@storybook/react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MoreHorizontal, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown,
  Edit,
  Trash2,
  Eye,
  Star,
  StarOff
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV003</TableCell>
          <TableCell>Unpaid</TableCell>
          <TableCell>Bank Transfer</TableCell>
          <TableCell className="text-right">$350.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV004</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$450.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV005</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-right">$550.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of your recent orders.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">#ORD001</TableCell>
          <TableCell>John Doe</TableCell>
          <TableCell>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              Completed
            </Badge>
          </TableCell>
          <TableCell>2024-01-15</TableCell>
          <TableCell className="text-right">$299.99</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">#ORD002</TableCell>
          <TableCell>Jane Smith</TableCell>
          <TableCell>
            <Badge variant="outline" className="border-yellow-300 text-yellow-800">
              Processing
            </Badge>
          </TableCell>
          <TableCell>2024-01-14</TableCell>
          <TableCell className="text-right">$199.99</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">#ORD003</TableCell>
          <TableCell>Bob Johnson</TableCell>
          <TableCell>
            <Badge variant="destructive">Cancelled</Badge>
          </TableCell>
          <TableCell>2024-01-13</TableCell>
          <TableCell className="text-right">$99.99</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">#ORD004</TableCell>
          <TableCell>Alice Brown</TableCell>
          <TableCell>
            <Badge variant="secondary">Pending</Badge>
          </TableCell>
          <TableCell>2024-01-12</TableCell>
          <TableCell className="text-right">$399.99</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>Admin</TableCell>
          <TableCell>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              Active
            </Badge>
          </TableCell>
          <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  View details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit user
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete user
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>Editor</TableCell>
          <TableCell>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              Active
            </Badge>
          </TableCell>
          <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  View details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit user
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete user
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Bob Johnson</TableCell>
          <TableCell>bob@example.com</TableCell>
          <TableCell>Viewer</TableCell>
          <TableCell>
            <Badge variant="secondary">Inactive</Badge>
          </TableCell>
          <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  View details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit user
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete user
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithSelection: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    
    const toggleSelection = (id: string) => {
      setSelectedItems(prev => 
        prev.includes(id) 
          ? prev.filter(item => item !== id)
          : [...prev, id]
      );
    };

    const toggleSelectAll = () => {
      const allIds = ['1', '2', '3', '4'];
      setSelectedItems(prev => 
        prev.length === allIds.length ? [] : allIds
      );
    };

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox 
                checked={selectedItems.length === 4}
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Checkbox 
                checked={selectedItems.includes('1')}
                onCheckedChange={() => toggleSelection('1')}
              />
            </TableCell>
            <TableCell className="font-medium">Laptop Pro</TableCell>
            <TableCell>Electronics</TableCell>
            <TableCell>$1,299.99</TableCell>
            <TableCell>42</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Checkbox 
                checked={selectedItems.includes('2')}
                onCheckedChange={() => toggleSelection('2')}
              />
            </TableCell>
            <TableCell className="font-medium">Wireless Mouse</TableCell>
            <TableCell>Accessories</TableCell>
            <TableCell>$29.99</TableCell>
            <TableCell>156</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Checkbox 
                checked={selectedItems.includes('3')}
                onCheckedChange={() => toggleSelection('3')}
              />
            </TableCell>
            <TableCell className="font-medium">USB-C Cable</TableCell>
            <TableCell>Accessories</TableCell>
            <TableCell>$19.99</TableCell>
            <TableCell>89</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Checkbox 
                checked={selectedItems.includes('4')}
                onCheckedChange={() => toggleSelection('4')}
              />
            </TableCell>
            <TableCell className="font-medium">Monitor Stand</TableCell>
            <TableCell>Accessories</TableCell>
            <TableCell>$79.99</TableCell>
            <TableCell>23</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Selected: {selectedItems.length} items</TableCell>
            <TableCell className="text-right">
              {selectedItems.length > 0 && (
                <Button variant="outline" size="sm">
                  Delete Selected
                </Button>
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  },
};

export const WithSorting: Story = {
  render: () => {
    const [sortField, setSortField] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const handleSort = (field: string) => {
      if (sortField === field) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortField(field);
        setSortDirection('asc');
      }
    };

    const SortButton = ({ field, children }: { field: string, children: React.ReactNode }) => (
      <Button 
        variant="ghost" 
        className="h-auto p-0 hover:bg-transparent font-medium text-muted-foreground"
        onClick={() => handleSort(field)}
      >
        {children}
        {sortField === field ? (
          sortDirection === 'asc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ArrowUpDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    );

    return (
      <Table>
        <TableCaption>Product inventory with sortable columns.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>
              <SortButton field="name">Name</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="price">Price</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="stock">Stock</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="rating">Rating</SortButton>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">iPhone 15 Pro</TableCell>
            <TableCell>$999.00</TableCell>
            <TableCell>25</TableCell>
            <TableCell>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1">4.8</span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">MacBook Air M3</TableCell>
            <TableCell>$1,299.00</TableCell>
            <TableCell>12</TableCell>
            <TableCell>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1">4.9</span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">AirPods Pro</TableCell>
            <TableCell>$249.00</TableCell>
            <TableCell>67</TableCell>
            <TableCell>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1">4.7</span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">iPad Pro</TableCell>
            <TableCell>$799.00</TableCell>
            <TableCell>8</TableCell>
            <TableCell>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1">4.6</span>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  },
};

export const WithAvatars: Story = {
  render: () => (
    <Table>
      <TableCaption>Team members and their roles.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Member</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Active</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <div className="flex items-center space-x-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">John Doe</div>
                <div className="text-sm text-muted-foreground">john@company.com</div>
              </div>
            </div>
          </TableCell>
          <TableCell>Senior Developer</TableCell>
          <TableCell>Engineering</TableCell>
          <TableCell>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              Active
            </Badge>
          </TableCell>
          <TableCell>2 minutes ago</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="flex items-center space-x-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Jane Smith</div>
                <div className="text-sm text-muted-foreground">jane@company.com</div>
              </div>
            </div>
          </TableCell>
          <TableCell>Product Manager</TableCell>
          <TableCell>Product</TableCell>
          <TableCell>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              Active
            </Badge>
          </TableCell>
          <TableCell>5 minutes ago</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="flex items-center space-x-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback>BJ</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Bob Johnson</div>
                <div className="text-sm text-muted-foreground">bob@company.com</div>
              </div>
            </div>
          </TableCell>
          <TableCell>Designer</TableCell>
          <TableCell>Design</TableCell>
          <TableCell>
            <Badge variant="secondary">Away</Badge>
          </TableCell>
          <TableCell>1 hour ago</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const ComplexDataTable: Story = {
  render: () => (
    <Table>
      <TableCaption>Sales performance dashboard.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Sales Rep</TableHead>
          <TableHead>Region</TableHead>
          <TableHead className="text-right">Units Sold</TableHead>
          <TableHead className="text-right">Revenue</TableHead>
          <TableHead className="text-right">Commission</TableHead>
          <TableHead>Performance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Enterprise Software License</TableCell>
          <TableCell>
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">SM</AvatarFallback>
              </Avatar>
              <span>Sarah Miller</span>
            </div>
          </TableCell>
          <TableCell>North America</TableCell>
          <TableCell className="text-right">156</TableCell>
          <TableCell className="text-right">$234,000</TableCell>
          <TableCell className="text-right">$11,700</TableCell>
          <TableCell>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <span className="text-sm text-green-600 font-medium">85%</span>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Cloud Storage Plan</TableCell>
          <TableCell>
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">DW</AvatarFallback>
              </Avatar>
              <span>David Wilson</span>
            </div>
          </TableCell>
          <TableCell>Europe</TableCell>
          <TableCell className="text-right">298</TableCell>
          <TableCell className="text-right">$89,400</TableCell>
          <TableCell className="text-right">$4,470</TableCell>
          <TableCell>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
              <span className="text-sm text-blue-600 font-medium">92%</span>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Mobile App Subscription</TableCell>
          <TableCell>
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">LT</AvatarFallback>
              </Avatar>
              <span>Lisa Thompson</span>
            </div>
          </TableCell>
          <TableCell>Asia Pacific</TableCell>
          <TableCell className="text-right">432</TableCell>
          <TableCell className="text-right">$64,800</TableCell>
          <TableCell className="text-right">$3,240</TableCell>
          <TableCell>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
              <span className="text-sm text-yellow-600 font-medium">67%</span>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} className="font-medium">Total</TableCell>
          <TableCell className="text-right font-medium">886</TableCell>
          <TableCell className="text-right font-medium">$388,200</TableCell>
          <TableCell className="text-right font-medium">$19,410</TableCell>
          <TableCell className="font-medium">81% Avg</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};
