import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const GroupBookingPanel = ({ isOpen, onToggle, groupMembers, onAddMember, onRemoveMember, paymentSplit }) => {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteMethod, setInviteMethod] = useState('email');

  const handleAddMember = () => {
    if (inviteEmail?.trim()) {
      onAddMember({
        id: Date.now(),
        email: inviteEmail,
        name: inviteEmail?.split('@')?.[0],
        status: 'pending',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${inviteEmail}`,
        paymentShare: 0
      });
      setInviteEmail('');
    }
  };

  const totalMembers = groupMembers?.length + 1; // +1 for the organizer
  const confirmedMembers = groupMembers?.filter(member => member?.status === 'confirmed')?.length + 1;

  return (
  <div className="pt-20"> 
<div className="bg-card rounded-athletic border border-border shadow-athletic">
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-athletic"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-athletic flex items-center justify-center">
            <Icon name="Users" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="font-athletic-bold text-text-primary">Group Booking</h3>
            <p className="text-sm text-text-secondary">
              {confirmedMembers} of {totalMembers} confirmed
            </p>
          </div>
        </div>
        
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-text-secondary" 
        />
      </div>
      {/* Expandable Content */}
      {isOpen && (
        <div className="border-t border-border p-4 space-y-4">
          {/* Invite Methods */}
          <div className="flex space-x-2 mb-4">
            {[
              { id: 'email', label: 'Email', icon: 'Mail' },
              { id: 'sms', label: 'SMS', icon: 'MessageSquare' },
              { id: 'platform', label: 'Friends', icon: 'UserPlus' }
            ]?.map(method => (
              <button
                key={method?.id}
                onClick={() => setInviteMethod(method?.id)}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-athletic text-sm font-athletic-medium transition-athletic
                  ${inviteMethod === method?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 text-text-secondary'
                  }
                `}
              >
                <Icon name={method?.icon} size={16} />
                <span>{method?.label}</span>
              </button>
            ))}
          </div>

          {/* Invite Input */}
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                type={inviteMethod === 'email' ? 'email' : 'text'}
                placeholder={
                  inviteMethod === 'email' ? 'Enter email address' :
                  inviteMethod === 'sms'? 'Enter phone number' : 'Search friends'
                }
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e?.target?.value)}
                onKeyPress={(e) => e?.key === 'Enter' && handleAddMember()}
              />
            </div>
            <Button
              variant="default"
              iconName="Plus"
              onClick={handleAddMember}
              disabled={!inviteEmail?.trim()}
            >
              Invite
            </Button>
          </div>

          {/* Group Members List */}
          <div className="space-y-3">
            {/* Organizer (You) */}
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-athletic">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Crown" size={16} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="font-athletic-medium text-text-primary">You (Organizer)</p>
                  <p className="text-xs text-text-secondary">alex.johnson@email.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-success text-success-foreground px-2 py-1 rounded-full">
                  Confirmed
                </span>
                <span className="text-sm font-athletic-medium text-text-primary">
                  ${paymentSplit?.organizer}
                </span>
              </div>
            </div>

            {/* Invited Members */}
            {groupMembers?.map(member => (
              <div key={member?.id} className="flex items-center justify-between p-3 bg-card border border-border rounded-athletic">
                <div className="flex items-center space-x-3">
                  <img
                    src={member?.avatar}
                    alt={member?.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-athletic-medium text-text-primary">{member?.name}</p>
                    <p className="text-xs text-text-secondary">{member?.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    member?.status === 'confirmed' ?'bg-success text-success-foreground'
                      : member?.status === 'pending' ?'bg-warning text-warning-foreground' :'bg-destructive text-destructive-foreground'
                  }`}>
                    {member?.status?.charAt(0)?.toUpperCase() + member?.status?.slice(1)}
                  </span>
                  
                  {member?.status === 'confirmed' && (
                    <span className="text-sm font-athletic-medium text-text-primary">
                      ${member?.paymentShare}
                    </span>
                  )}
                  
                  <button
                    onClick={() => onRemoveMember(member?.id)}
                    className="p-1 rounded-athletic hover:bg-destructive/10 text-destructive transition-athletic"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Split Summary */}
          {groupMembers?.length > 0 && (
            <div className="bg-gradient-athletic-depth rounded-athletic p-4">
              <h4 className="font-athletic-bold text-text-primary mb-3 flex items-center">
                <Icon name="CreditCard" size={16} className="mr-2" />
                Payment Split
              </h4>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-text-secondary">Total Cost</p>
                  <p className="font-athletic-bold text-text-primary">${paymentSplit?.total}</p>
                </div>
                <div>
                  <p className="text-text-secondary">Per Person</p>
                  <p className="font-athletic-bold text-text-primary">${paymentSplit?.perPerson}</p>
                </div>
                <div>
                  <p className="text-text-secondary">Your Share</p>
                  <p className="font-athletic-bold text-primary">${paymentSplit?.organizer}</p>
                </div>
                <div>
                  <p className="text-text-secondary">Confirmed</p>
                  <p className="font-athletic-bold text-success">{confirmedMembers}/{totalMembers}</p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex space-x-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              iconName="MessageCircle"
              iconPosition="left"
              className="flex-1"
            >
              Group Chat
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Calendar"
              iconPosition="left"
              className="flex-1"
            >
              Send Reminder
            </Button>
          </div>
        </div>
      )}
    </div>
  </div>
);

};

export default GroupBookingPanel;

