import { Users } from 'lucide-react';
import { Card } from '../../../../components/ui/Card';

export const ActiveUsersCard = () => {
  return (
    <Card className="flex flex-col justify-between relative overflow-hidden">
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary rounded-full blur-[80px] opacity-20"></div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.8)]"></span>
            <h3 className="text-text-muted text-sm font-medium uppercase tracking-wider">Active Users</h3>
          </div>
          <Users size={20} className="text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-text-main mb-1">24,592</h2>
        <p className="text-sm text-text-muted">Live users right now</p>
      </div>

      <div className="mt-8 space-y-4">
        <UserStat label="Desktop" percentage={62} />
        <UserStat label="Mobile" percentage={38} isSecondary />
      </div>
    </Card>
  );
};

// პატარა დამხმარე კომპონენტი მხოლოდ ამ ფაილისთვის
const UserStat = ({ label, percentage, isSecondary }: { label: string, percentage: number, isSecondary?: boolean }) => (
  <>
    <div className="flex justify-between text-sm mb-1 text-text-muted">
      <span>{label}</span>
      <span>{percentage}%</span>
    </div>
    <div className="w-full h-2 bg-input-bg rounded-full overflow-hidden">
      <div 
        className={`h-full ${isSecondary ? 'bg-primary/50' : 'bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]'}`} 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </>
);