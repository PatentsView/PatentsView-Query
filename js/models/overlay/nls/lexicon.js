		
/**
 * Setup for i18n compatible language and phrase object.
 * @author Brett Johnson, periscopic.com
 */

define({
	// the default lexicon
	"root": {
		"titles": {
			"patentClass": "What is a Patent Class?",
			"uspc": "USPC",
			"nber": "NBER",
			"cpc": "CPC",
			"about": "About",
			"economist": "Office of the Chief Economist",
			"howTo": "How-to-Use",
			"filterOpts": "Filter Options",
			"methodsSources": "Methods & Sources"
		},

		"glossary": {
			application: {
				title: "Application",
				text: "An application for a patent that includes all types of patent applications expect provision applications. An application number is the unique number assigned to a patent application when it is filed and includes a two digit series code and a six digit serial number."
			},
			assignee: {
				title: "Assignee",
				text: "The name of the entity&mdash;company, foundation, partnership, holding company or individual&mdash;that owns the patent."
			},
			cited_patent: {
				title: "Cited Patent",
				text: "A patent that is cited as a reference in another patent application. The cited patent number will show in the ‘references cited’ section of the patent application."
			},
			citing_patent: {
				title: "Citing Patent",
				text: "A patent that cites a given granted patent or patent application."
			},
			claim: {
				title: "Claim",
				text: "A single sentence that describes an invention as defined in the specification of a patent application. A claim defines the invention and the aspects of it that are legally enforceable."
			},
			co_inventor: {
				title: "Co-inventor",
				text: "For a given inventor, any other inventor on the same patent application or granted patent."
			},
			cpc: {
				title: "Cooperative Patent Classification",
				text: "A hierarchical patent classification scheme that is a joint partnership between the USPTO and the EPO to harmonize their existing classification systems (ECLA and USPC, respectively) and migrate towards a common classification scheme."
			},
			current_classification: {
				title: "Current Classification",
				text: "The most recent USPC classification for a given patent, which is used to determine the most recent NBER category and CPC class."
			},
			design_patent: {
				title: "Design Patent",
				text: "Design patents cover a new, original, and ornamental design for an article of manufacture."
			},
			disambiguation: {
				title: "Disambiguation",
				text: "The process of identifying the same entity (person, organization, etc.) across and between datasets, when there is no common system of entity identifiers."
			},
			filed_date: {
				title: "Filed Date",
				text: "The date a patent application was filed with the USPTO."
			},
			first_named_inventor: {
				title: "First Named Inventor",
				text: "The first inventor on a patent application. The first named inventor is the applicant when more than one inventor is identified on a patent application. The first named inventor is the assignee (owner) if the patent application doesn't include an assignee. "
			},
			grant_date: {
				title: "Grant Date",
				text: "The date a patent was issued by the USPTO. Grant dates are always on Tuesday."
			},
			individual_inventors: {
				title: "Individual Inventors",
				text: "Inventors who \"own\" their own patents. The first named inventor on a patent becomes the assignee if no assignee is identified on the patent application."
			},
			inventor: {
				title: "Inventor",
				text: "The applicant in patent application."
			},
			ipc: {
				title: "International Patent Classification (IPC)",
				text: "The system of patent classifications published by the World Intellectual Property Organization (WIPO)."
			},
			kind: {
				title: "Kind",
				text: "A code assigned by USPTO to all patents. They include a letter, and in many cases a number, used to distinguish the kind of patent document (e.g., publication of an application for a utility patent (patent application publication), patent, plant patent application publication, plant patent, or design patent) and the level of publication (e.g., first publication, second publication, or corrected publication)."
			},
			location_at_issue: {
				title: "Location, At-issue",
				text: "The location for an inventor or assignee as recorded on a published patent grant or application."
			},
			location_most_recent: {
				title: "Location, Most Recent",
				text: "The location on an inventor or assignee’s most recent patent in the PatentsView database. This data is determined by the results of the inventor and assignee disambiguation and is the default location setting for both Inventors and Assignees in the data visualization tool."
			},
			nber: {
				title: "NBER Category",
				text: "The system of patent technological categories/subcategories classification designed by the National Bureau of Economic Research (NBER) as part of the patent database project (Hall, Jaffe, and Trajtenberg 2002).  USPTO has generated an algorithm to assign current NBER subcategories to all published US patents, based on a USPC crosswalk generated by the NBER team in 2006."
			},
			at_issue_or_original_classification: {
				title: "At-Issue or Original Classification",
				text: "The primary classification assigned to a patent at the time it is granted. This classification is also called the OR classification. It appears in bold on the face of a published patent."
			},
			patent: {
				title: "Patent",
				text: "A property right granted by the Government of the United States of America to an inventor \"to exclude others from making, using, offering for sale, or selling the invention throughout the United States or importing the invention into the United States\" for a limited time in exchange for public disclosure of the invention when the patent is granted."
			},
			patent_processing_time: {
				title: "Patent Processing Time",
				text: "The time elapsed between an patent application filed date and the grant date for that same patent."
			},
			plant_patent: {
				title: "Plant Patent",
				text: "Patents granted to an inventor who has invented or discovered and asexually reproduced a distinct and new variety of plant."
			},
			patent_title: {
				title: "Title",
				text: "The title of a patent."
			},
			patent_type: {
				title: "Type",
				text: "USPTO issues several different types of patent documents offering different kinds of protection and covering different types of subject matter. These are: utility, design, plant, reissue, defensive, and statutory invention registration."
			},
			uspc: {
				title: "United States Patent Classification System (USPC)",
				text: "The patent classification system used by the USPTO to classify and organize patent applications filed and patents granted in the United States.Every class has a unique alphanumeric identifier. A class/subclass pair of identifiers uniquely identifies a subclass within a class."
			},
			utility_patent: {
				title: "Utility Patent",
				text: "Utility Patents are issued for the invention of a new and useful process, machine, manufacture, or composition of matter, or a new and useful improvement."
			},
			uspto: {
				title: "USPTO",
				text: "The United States Patent and Trademark Office — An Agency in the US Department of Commerce responsible for matters related to intellectual property."
			}
		}
	}	
});