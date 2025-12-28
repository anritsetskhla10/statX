const team = [
  { name: "Alex K.", role: "Founder & CEO", color: "bg-blue-500" },
  { name: "Sarah M.", role: "Head of Product", color: "bg-purple-500" },
  { name: "David G.", role: "Lead Engineer", color: "bg-green-500" },
  { name: "Lisa R.", role: "Design Lead", color: "bg-orange-500" },
];

export const TeamSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-main">Meet the Team</h2>
            <p className="text-text-muted mt-2">The minds behind the platform.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
                <div key={i} className="group p-6 bg-card-bg border border-border-color rounded-3xl hover:-translate-y-2 transition-transform duration-300">
                    <div className={`w-20 h-20 rounded-full ${member.color} mb-4 mx-auto opacity-80 group-hover:opacity-100 transition-opacity`}></div>
                    <h3 className="text-xl font-bold text-text-main text-center">{member.name}</h3>
                    <p className="text-primary text-sm text-center font-medium">{member.role}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};