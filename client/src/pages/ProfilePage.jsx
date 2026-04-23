import { HiOutlineUser, HiOutlineMail, HiOutlineTrophy, HiOutlineUserGroup } from 'react-icons/hi';
import { MdSportsCricket } from 'react-icons/md';

const ProfilePage = () => {
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-txt-primary">Profile</h1>

      <div className="card border border-surface-border p-6">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-black">
            K
          </div>
          <div>
            <h2 className="text-2xl font-black text-txt-primary">Krissa</h2>
            <p className="text-txt-muted">krissa0507@gmail.com</p>
            <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mt-1 inline-block">
              Tournament Organizer
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="card text-center p-4 bg-surface border border-surface-border">
            <HiOutlineTrophy className="text-2xl text-accent mx-auto mb-1" />
            <p className="text-2xl font-black text-txt-primary">4</p>
            <p className="text-xs text-txt-muted uppercase font-bold tracking-widest">Tournaments</p>
          </div>
          <div className="card text-center p-4 bg-surface border border-surface-border">
            <HiOutlineUserGroup className="text-2xl text-secondary mx-auto mb-1" />
            <p className="text-2xl font-black text-txt-primary">4</p>
            <p className="text-xs text-txt-muted uppercase font-bold tracking-widest">Teams</p>
          </div>
          <div className="card text-center p-4 bg-surface border border-surface-border">
            <MdSportsCricket className="text-2xl text-primary mx-auto mb-1" />
            <p className="text-2xl font-black text-txt-primary">12</p>
            <p className="text-xs text-txt-muted uppercase font-bold tracking-widest">Matches</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="label">Full Name</label>
            <div className="input flex items-center gap-2 bg-surface">
              <HiOutlineUser className="text-txt-muted" />
              <span>Krissa</span>
            </div>
          </div>
          <div>
            <label className="label">Email Address</label>
            <div className="input flex items-center gap-2 bg-surface">
              <HiOutlineMail className="text-txt-muted" />
              <span>krissa0507@gmail.com</span>
            </div>
          </div>
          <button className="btn-primary w-full py-3 font-black uppercase tracking-widest">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;